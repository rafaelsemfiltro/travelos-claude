// claude: alertas e pendências críticas da viagem Ásia 2026 (25 dias)

export interface Alerta {
	id: string;
	titulo: string;
	descricao: string;
	prazo: string;
	tipo: 'voo' | 'visto' | 'hotel' | 'transporte' | 'saude' | 'geral';
	urgencia: 'critica' | 'alta' | 'normal';
	concluido: boolean;
	diaRelacionado?: string;
}

export const alertas: Alerta[] = [
	{
		id: 'alerta-01',
		titulo: 'Check-in online voo GRU → IST (Turkish Airlines)',
		descricao:
			'Fazer check-in online no site da Turkish Airlines. Selecionar assentos com antecedência — voo longo, vale escolher janela ou corredor.',
		prazo: '03/11 — 48h antes da partida (17:10)',
		tipo: 'voo',
		urgencia: 'critica',
		concluido: false,
		diaRelacionado: 'dia-01'
	},
	{
		id: 'alerta-02',
		titulo: 'Vacina febre amarela — documento internacional',
		descricao:
			'Confirmar carteira de vacinação internacional (CIVP) está válida e será levada na mala. Alguns países da rota exigem comprovante na entrada.',
		prazo: 'Antes da partida — Dia 01 (05/11)',
		tipo: 'saude',
		urgencia: 'critica',
		concluido: false,
		diaRelacionado: 'dia-01'
	},
	{
		id: 'alerta-03',
		titulo: 'Visto China — imprimir comprovante',
		descricao:
			'Imprimir o comprovante de aprovação do visto chinês (L-visa ou e-visa). Ter cópia física além do digital — imigração pode exigir papel impresso.',
		prazo: 'Antes do Dia 09 (entrada na China)',
		tipo: 'visto',
		urgencia: 'critica',
		concluido: false,
		diaRelacionado: 'dia-09'
	},
	{
		id: 'alerta-04',
		titulo: 'Confirmar trem ZJJ West → Changsha South',
		descricao:
			'CRÍTICO: reservar trem saindo de Zhangjiajie WEST (只坐长沙南站). Não aceitar passagem para estação central antiga. Verificar horário compatível com voo FD481 12:55 do CSX.',
		prazo: 'Antes do Dia 15 (19/11)',
		tipo: 'transporte',
		urgencia: 'critica',
		concluido: false,
		diaRelacionado: 'dia-15'
	},
	{
		id: 'alerta-05',
		titulo: 'Ingresso Yi Peng Chiang Mai — confirmar data e status',
		descricao:
			'Verificar e confirmar ingresso VIP para o festival de lanternas Yi Peng. Confirmar data exata do evento (pico noturno) e horário de embarque no CMECC às 13h.',
		prazo: 'Antes do Dia 20 (24/11)',
		tipo: 'geral',
		urgencia: 'critica',
		concluido: false,
		diaRelacionado: 'dia-20'
	},
	{
		id: 'alerta-06',
		titulo: 'Seguro viagem — verificar cobertura ativa',
		descricao:
			'Confirmar que o seguro cobre todos os países do roteiro (Brasil → Turquia → Vietnã → China → Tailândia). Salvar número de emergência e do sinistro offline no celular.',
		prazo: 'Antes da partida — Dia 01 (05/11)',
		tipo: 'saude',
		urgencia: 'alta',
		concluido: false,
		diaRelacionado: 'dia-01'
	},
	{
		id: 'alerta-07',
		titulo: 'Confirmar ônibus-cabine Hanói → Sa Pa',
		descricao:
			'Status do transporte ainda "pendente". Confirmar emissão da passagem do ônibus-cabine das 23:30. Guardar comprovante para embarque.',
		prazo: 'Dia 05 — 09/11 (noite)',
		tipo: 'transporte',
		urgencia: 'alta',
		concluido: false,
		diaRelacionado: 'dia-05'
	},
	{
		id: 'alerta-08',
		titulo: 'Amap (高德地图) — instalar e baixar mapas offline',
		descricao:
			'Instalar o Amap e baixar mapas offline de Chongqing e Zhangjiajie antes de entrar na China. Google Maps não funciona sem VPN no território chinês.',
		prazo: 'Antes do Dia 09 (entrada na China)',
		tipo: 'geral',
		urgencia: 'alta',
		concluido: false,
		diaRelacionado: 'dia-09'
	},
	{
		id: 'alerta-09',
		titulo: 'Check-in online voo FD481 Changsha → Bangkok',
		descricao:
			'Fazer check-in online do voo AirAsia FD481 CSX → DMK (decolagem 12:55). Importante para agilizar o embarque no Dia 15 que tem conexão apertada.',
		prazo: 'Dia 13 — 48h antes do Dia 15',
		tipo: 'voo',
		urgencia: 'alta',
		concluido: false,
		diaRelacionado: 'dia-15'
	},
	{
		id: 'alerta-10',
		titulo: 'Check-in online voo de volta BKK → GRU',
		descricao:
			'Fazer check-in online do voo Turkish Airlines Bangkok → Istambul → São Paulo. Decolagem 10:10 do BKK (Suvarnabhumi). Saída do hotel às 7h.',
		prazo: '27/11 — 48h antes do Dia 25',
		tipo: 'voo',
		urgencia: 'alta',
		concluido: false,
		diaRelacionado: 'dia-25'
	},
	{
		id: 'alerta-11',
		titulo: 'Confirmar transfer Bangkok → aeroporto BKK',
		descricao:
			'Reservar transfer do hotel para o Aeroporto Suvarnabhumi (BKK) com antecedência. Saída prevista às 07:00 — trânsito de Bangkok de manhã pode ser imprevisível.',
		prazo: 'Antes do Dia 25 (29/11)',
		tipo: 'transporte',
		urgencia: 'alta',
		concluido: false,
		diaRelacionado: 'dia-25'
	},
	{
		id: 'alerta-12',
		titulo: 'SIM card vietnamita — comprar no aeroporto Hanói',
		descricao:
			'Comprar SIM card local ao chegar no aeroporto de Hanói (Noi Bai). Operadoras recomendadas: Viettel ou Vinaphone. Ter foto do passaporte em mãos.',
		prazo: 'Dia 03 — 07/11 (chegada Hanói)',
		tipo: 'transporte',
		urgencia: 'normal',
		concluido: false,
		diaRelacionado: 'dia-03'
	},
	{
		id: 'alerta-13',
		titulo: 'Google Translate — baixar pacotes offline',
		descricao:
			'Baixar pacotes de idioma offline: Tailandês, Vietnamita e Chinês Simplificado. Essencial na China onde o acesso à internet livre é restrito.',
		prazo: 'Antes da partida',
		tipo: 'geral',
		urgencia: 'normal',
		concluido: false,
		diaRelacionado: 'dia-01'
	},
	{
		id: 'alerta-14',
		titulo: 'Train Street Hanói — confirmar reserva no café',
		descricao:
			'Entrar na Train Street apenas com reserva num café local do beco. Não confiar em motoboys que oferecem entrada na rua. Confirmar horário do trem com o café.',
		prazo: 'Dia 05 — 09/11',
		tipo: 'hotel',
		urgencia: 'normal',
		concluido: false,
		diaRelacionado: 'dia-05'
	},
	{
		id: 'alerta-15',
		titulo: 'Alipay / WeChat Pay — configurar antes da China',
		descricao:
			'Configurar conta Alipay ou WeChat Pay com cartão internacional antes de entrar na China. Pagamentos em dinheiro físico são raros em Chongqing e Zhangjiajie.',
		prazo: 'Antes do Dia 09 (entrada na China)',
		tipo: 'geral',
		urgencia: 'normal',
		concluido: false,
		diaRelacionado: 'dia-09'
	}
];
