// claude: Cloudflare Worker proxy — TravelOS AI Guide (OpenAI gpt-4o)
// Deployed separately from the app (see worker/README.md). Never commit an API key here;
// OPENAI_API_KEY is read from the Cloudflare secret store at runtime.

const ALLOWED_ORIGIN = 'https://rafaelsemfiltro.github.io';

function corsHeaders() {
	return {
		'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
		'Access-Control-Allow-Methods': 'POST, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type',
		Vary: 'Origin'
	};
}

function jsonResponse(body, status = 200) {
	return new Response(JSON.stringify(body), {
		status,
		headers: { 'Content-Type': 'application/json', ...corsHeaders() }
	});
}

function buildSystemPrompt(dayContext) {
	const contextBlock = dayContext
		? `Contexto do dia atual da viagem (JSON):\n${JSON.stringify(dayContext)}`
		: 'Não há um dia ativo no momento (a viagem ainda não começou ou já terminou).';

	return [
		'Você é o "Guia", o assistente de viagem do TravelOS, acompanhando Rafael e Leonardo em uma viagem pela Ásia em 2026.',
		contextBlock,
		'Regras importantes:',
		'- Nunca remova, cancele ou marque como concluído qualquer destino, atividade ou item do roteiro sem confirmação explícita do usuário na conversa. Você pode apenas sugerir.',
		'- Você conhece os planos de contingência A/B/C/D do dia (plano ideal, alternativo, de energia baixa, de emergência) e pode sugerir trocar de plano quando fizer sentido (cansaço, clima, atraso, etc).',
		'- Pode sugerir reorganizações de horário, atividades alternativas, pausas para descanso, restaurantes e cervejarias/bares locais próximos ao destino do dia.',
		'- Responda sempre em português brasileiro, de forma concisa e prática: no máximo 3 parágrafos curtos por resposta.'
	].join('\n\n');
}

async function handleChat(request, env) {
	if (!env.OPENAI_API_KEY) {
		return jsonResponse({ error: 'Chave da OpenAI não configurada no worker.' }, 500);
	}

	let body;
	try {
		body = await request.json();
	} catch {
		return jsonResponse({ error: 'Corpo da requisição inválido.' }, 400);
	}

	const { message, dayContext, history } = body ?? {};
	if (!message || typeof message !== 'string') {
		return jsonResponse({ error: 'Campo "message" é obrigatório.' }, 400);
	}

	const safeHistory = Array.isArray(history)
		? history
				.filter(
					(m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string'
				)
				.slice(-20)
		: [];

	const messages = [
		{ role: 'system', content: buildSystemPrompt(dayContext) },
		...safeHistory,
		{ role: 'user', content: message }
	];

	let openaiRes;
	try {
		openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${env.OPENAI_API_KEY}`
			},
			body: JSON.stringify({
				model: 'gpt-4o',
				messages,
				temperature: 0.7,
				max_tokens: 500
			})
		});
	} catch {
		return jsonResponse({ error: 'Não foi possível contatar a OpenAI. Tente novamente.' }, 500);
	}

	if (!openaiRes.ok) {
		if (openaiRes.status === 401) {
			return jsonResponse({ error: 'Chave da OpenAI inválida ou expirada.' }, 401);
		}
		if (openaiRes.status === 429) {
			return jsonResponse(
				{ error: 'Limite de requisições da OpenAI atingido. Tente novamente em instantes.' },
				429
			);
		}
		return jsonResponse({ error: 'A OpenAI está indisponível no momento. Tente novamente.' }, 502);
	}

	const data = await openaiRes.json();
	const reply = data?.choices?.[0]?.message?.content?.trim();
	if (!reply) {
		return jsonResponse({ error: 'A OpenAI retornou uma resposta vazia.' }, 502);
	}

	return jsonResponse({ reply });
}

export default {
	async fetch(request, env) {
		if (request.method === 'OPTIONS') {
			return new Response(null, { headers: corsHeaders() });
		}

		const { pathname } = new URL(request.url);

		if (pathname === '/chat' && request.method === 'POST') {
			return handleChat(request, env);
		}

		return jsonResponse({ error: 'Não encontrado.' }, 404);
	}
};
