// claude: conteúdo de criação por dia — ideias específicas baseadas no roteiro real

export type TipoIdeia = 'foto' | 'story' | 'reel' | 'nota';

export interface IdeiaConteudo {
	tipo: TipoIdeia;
	titulo: string;
	descricao: string;
	melhorHorario?: string;
}

export interface CreatorDia {
	diaId: string;
	destino: string;
	ideias: IdeiaConteudo[];
}

export const creatorData: CreatorDia[] = [
	{
		diaId: 'dia-01',
		destino: 'São Paulo → Istambul',
		ideias: [
			{
				tipo: 'story',
				titulo: 'Partida no GRU',
				descricao: 'Gravar o check-in e a fila de embarque de forma rápida — câmera no bolso de cima, ângulo de cima pra baixo mostrando o passaporte e a tag da mala.',
				melhorHorario: 'Tarde'
			},
			{
				tipo: 'reel',
				titulo: 'Time-lapse da decolagem',
				descricao: 'Janela do avião — câmera travada contra o vidro capturando São Paulo sumindo entre as nuvens. Editar com música épica e texto "25 dias de viagem começa agora".',
				melhorHorario: '17h10'
			},
			{
				tipo: 'nota',
				titulo: 'Registrar a sensação da partida',
				descricao: 'Escrever ou gravar um áudio de 30s ainda no aeroporto descrevendo a expectativa. Bom material para voz over no vídeo de recapitulação.'
			}
		]
	},
	{
		diaId: 'dia-02',
		destino: 'Istambul',
		ideias: [
			{
				tipo: 'foto',
				titulo: 'Skyline de Sultanahmet',
				descricao: 'Do mirante Seven Hills — câmera na beirada da mesa capturando o Bósforo, as mesquitas e os minaretes ao fundo. Pedir mesa na borda. Luz dourada 30min antes do pôr do sol.',
				melhorHorario: 'Pôr do sol (~17h)'
			},
			{
				tipo: 'reel',
				titulo: 'Hammam Kadırga',
				descricao: 'Gravar a entrada do hammam, o teto estrelado de mármore por dentro e o vapor — câmera no modo retrato, movimentos lentos. Não mostrar outras pessoas sem permissão.',
				melhorHorario: 'Tarde'
			},
			{
				tipo: 'story',
				titulo: 'Testi Kebabı sendo quebrado',
				descricao: 'Story vertical filmando o momento em que o garçom quebra o pote de barro na mesa — câmera 2x zoom, mão firme.'
			}
		]
	},
	{
		diaId: 'dia-03',
		destino: 'Bangkok → Hanói',
		ideias: [
			{
				tipo: 'story',
				titulo: 'Transfer entre aeroportos Bangkok',
				descricao: 'Gravar 15s do trânsito caótico entre BKK e DMK — janela do táxi, legendar "esses são aeroportos DIFERENTES em Bangkok" para contextualizar os seguidores.',
				melhorHorario: 'Manhã'
			},
			{
				tipo: 'nota',
				titulo: 'Primeira impressão de Hanói',
				descricao: 'Ao chegar no Little Diamond Hotel, gravar uma panorâmica rápida da rua — motos, luzes, barulho. Material de abertura para o bloco Vietnã.'
			}
		]
	},
	{
		diaId: 'dia-04',
		destino: 'Ha Long',
		ideias: [
			{
				tipo: 'foto',
				titulo: 'Reflexo das ilhas no amanhecer',
				descricao: 'Na proa do barco às 7h — câmera bem rente à água ou ao corrimão de madeira, capturando os paredões de pedra calcária refletidos na água calma. Antes das outras embarcações chegarem.',
				melhorHorario: 'Amanhecer'
			},
			{
				tipo: 'reel',
				titulo: 'Kayak pela caverna',
				descricao: 'Câmera na testa ou no remo — gravar a entrada e saída da caverna com a mudança de luz dramática. Editar com corte seco do escuro para o azul da lagoa do outro lado.',
				melhorHorario: 'Manhã'
			},
			{
				tipo: 'foto',
				titulo: 'Ti Top Island — vista de cima',
				descricao: 'No topo da ilha após a subida — câmera apontada pra baixo em direção ao barco ancorado. Incluir a silhueta de alguém no canto para dar escala.',
				melhorHorario: 'Antes do almoço'
			},
			{
				tipo: 'story',
				titulo: 'Almoço no barco',
				descricao: 'Mesa posta no deque do barco com Ha Long ao fundo — gravar um zoom lento saindo da comida para a paisagem. Simples, elegante, sem falar nada.'
			}
		]
	},
	{
		diaId: 'dia-05',
		destino: 'Hanói',
		ideias: [
			{
				tipo: 'foto',
				titulo: 'Egg coffee no telhado',
				descricao: 'Xícara de egg coffee em primeiro plano, Hồ Hoàn Kiếm desfocado ao fundo — câmera baixa, luz natural da manhã, sem flash. Buscar cafés no 3º ou 4º andar com vista pro lago.',
				melhorHorario: 'Manhã'
			},
			{
				tipo: 'reel',
				titulo: 'Train Street — trem passando',
				descricao: 'Câmera baixa na beira do trilho (do café licenciado) — gravar o trem chegando com vibração no chão. Usar modo câmera lenta 60fps e editar com slow motion no momento do trem passando.',
				melhorHorario: 'Horário do trem'
			},
			{
				tipo: 'story',
				titulo: 'Bún chả no Old Quarter',
				descricao: 'Câmera em cima da tigela — carne grelhada, verdinhos e caldo fumegante. Gravar com a colher mexendo devagar. Legendar "bún chả de verdade, não o do Bourdain lol".'
			},
			{
				tipo: 'foto',
				titulo: 'Templo da Literatura — porta vermelho/dourada',
				descricao: 'Porta principal Văn Miếu — câmera centralizada na simetria perfeita da entrada, pessoas pequenas para dar escala. Melhor se não tiver aglomeração na frente.',
				melhorHorario: 'Tarde'
			}
		]
	},
	{
		diaId: 'dia-06',
		destino: 'Sa Pa',
		ideias: [
			{
				tipo: 'reel',
				titulo: 'Teleférico subindo para o Fansipan',
				descricao: 'Câmera na janela do teleférico — gravar a neblina abrindo e fechando enquanto sobe, com as montanhas surgindo. Editar acelerado até a chegada no cume a 3.143m.',
				melhorHorario: 'Manhã cedo'
			},
			{
				tipo: 'foto',
				titulo: 'Cume do Fansipan nas nuvens',
				descricao: 'No topo — câmera apontada pra baixo capturando um mar de nuvens. Incluir botas/pés no canto inferior para situar. Funciona melhor quando nuvens estão abaixo do cume.',
				melhorHorario: 'Manhã'
			},
			{
				tipo: 'story',
				titulo: 'Banho de ervas Red Dao',
				descricao: 'Gravar os ingredientes antes de entrar na banheira — plantas, cascas, flores — e a água escura que vai ficando. Contextualizar brevemente a tradição Red Dao.'
			},
			{
				tipo: 'reel',
				titulo: 'Mercado noturno de Sa Pa',
				descricao: 'Walk-through do mercado à noite — câmera no peito, movimento constante e lento, capturando barracas de comida, artesanato e mulheres Hmong. Não usar flash; aproveitar a luz quente das barracas.',
				melhorHorario: 'Noite'
			}
		]
	},
	{
		diaId: 'dia-07',
		destino: 'Vale Mường Hoa → Hanói',
		ideias: [
			{
				tipo: 'reel',
				titulo: 'Moto pelas terraças de arroz',
				descricao: 'Câmera fixada no guidão ou capacete — gravar a descida pelas curvas com as terraças em socalcos em perspectiva. Editar com música e corte em cada curva fechada.',
				melhorHorario: 'Manhã'
			},
			{
				tipo: 'foto',
				titulo: 'Aldeias Sa Sẻng e Lao Chải',
				descricao: 'Crianças, idosos ou moradores em frente às casas de madeira — pedir permissão com sorriso. Câmera ao nível dos olhos, luz lateral da manhã. Não usar zoom; aproximar-se.'
			},
			{
				tipo: 'foto',
				titulo: 'Ponte de bambu suspensa sobre o vale',
				descricao: 'Na ponte — câmera apontada pra frente capturando a estrutura da ponte em perspectiva com o vale verde ao fundo. Aguardar momento sem outros turistas.',
				melhorHorario: 'Manhã cedo'
			},
			{
				tipo: 'story',
				titulo: 'Vista panorâmica do mirante',
				descricao: 'Do mirante no início da rota — 15s de pan lento da esquerda para a direita capturando a extensão das terraças. Legendar a altitude e o nome do vale.'
			}
		]
	},
	{
		diaId: 'dia-08',
		destino: 'Hanói',
		ideias: [
			{
				tipo: 'foto',
				titulo: 'Pagode de Um Pilar',
				descricao: 'Ângulo de baixo para cima — câmera rente à água capturando o pagode emergindo como se flutuasse. Melhor pela manhã com menos visitantes.',
				melhorHorario: 'Manhã'
			},
			{
				tipo: 'story',
				titulo: 'Đồng Xuân Market — caos organizado',
				descricao: 'Walk-through rápido de 30s pelo mercado — câmera no peito, capturar variedade de produtos, vendedores, cores. Legendar "o maior mercado coberto de Hanói".'
			},
			{
				tipo: 'nota',
				titulo: 'Dia de backup — revisar e organizar conteúdo',
				descricao: 'Aproveitar o ritmo leve de hoje para revisar e selecionar as melhores fotos/vídeos dos dias anteriores. Dia ideal para organizar pastas e definir o que falta capturar nos próximos dias.'
			}
		]
	},
	{
		diaId: 'dia-09',
		destino: 'Hanói → Chongqing',
		ideias: [
			{
				tipo: 'story',
				titulo: 'Passagem de fronteira Vietnã → China',
				descricao: 'Gravar o momento de entrar no avião para China — sinalização em chinês, sensação de transição de bloco. Legendar "muda tudo: app, língua, pagamento".'
			},
			{
				tipo: 'nota',
				titulo: 'Primeira visão aérea de Chongqing',
				descricao: 'Se estiver na janela, gravar a descida — Chongqing à noite com infinidade de luzes sobre as montanhas é impressionante. Gravar mesmo com qualidade ruim, pois dificilmente haverá outra chance.'
			}
		]
	},
	{
		diaId: 'dia-10',
		destino: 'Chongqing',
		ideias: [
			{
				tipo: 'reel',
				titulo: 'Metrô passando pelo prédio — Liziba',
				descricao: 'Na plataforma Liziba — câmera travada no trilho, gravar o trem linha 2 saindo do interior do edifício. Usar câmera lenta na saída do vagão. Conteúdo viral garantido.',
				melhorHorario: 'Manhã'
			},
			{
				tipo: 'foto',
				titulo: 'Hongya Cave iluminada à noite',
				descricao: 'Da Ponte Qiansimen — câmera com ISO baixo e tripé/apoio, capturar o reflexo das luzes laranjas e douradas da Hongya Cave no Rio Jialing. Chegar antes de apagar as luzes.',
				melhorHorario: 'Noite'
			},
			{
				tipo: 'story',
				titulo: 'Hotpot de Chongqing',
				descricao: 'Câmera em cima da panela borbulhando com pimenta vermelha — gravar a reação ao primeiro gole do caldo. Story autêntico; não fingir que está gostando se estiver ardendo.'
			},
			{
				tipo: 'reel',
				titulo: 'Baixiangju — descida do 15º ao 1º andar',
				descricao: 'Gravar a descida pelos corredores temáticos do 15º ao 1º andar — câmera na frente, um corte por andar. Mostrar como a estética muda a cada nível.',
				melhorHorario: 'Tarde'
			}
		]
	},
	{
		diaId: 'dia-11',
		destino: 'Cloud Eye → Furong',
		ideias: [
			{
				tipo: 'foto',
				titulo: 'Cloud Eye — vista 360° de Chongqing',
				descricao: 'No mirante Cloud Eye — câmera apontada para o Rio Jialing com os arranha-céus ao fundo. Aproveitar neblina matinal se houver; cria profundidade dramática.',
				melhorHorario: 'Manhã (9h)'
			},
			{
				tipo: 'reel',
				titulo: 'Cachoeira de Furong Town à noite',
				descricao: 'Com a vila iluminada ao fundo — câmera com slow shutter ou modo noturno, capturar o fluxo da cachoeira com a luz laranja da vila. Usar tripé ou apoiar em muro.',
				melhorHorario: 'Noite'
			},
			{
				tipo: 'story',
				titulo: 'Vila de Furong iluminada',
				descricao: 'Walk-through rápido das vielas com lanternas — gravar a primeira impressão chegando. Legendar "cidade construída na encosta de uma montanha, Hunan, China".'
			}
		]
	},
	{
		diaId: 'dia-12',
		destino: 'Furong → Wulingyuan',
		ideias: [
			{
				tipo: 'foto',
				titulo: 'Passarelas de Furong com neblina',
				descricao: 'Nas passarelas suspensas — câmera apontada para a frente capturando a passarela sumindo na neblina do vale. Melhor no início da manhã quando a névoa ainda cobre o vale.',
				melhorHorario: 'Manhã cedo'
			},
			{
				tipo: 'reel',
				titulo: 'Passeio de barco no rio',
				descricao: 'Da proa do barco — câmera baixa capturando a água fendendo em V, com os paredões verdes nas laterais. Gravar a entrada em canyon estreito se houver.',
				melhorHorario: 'Manhã'
			},
			{
				tipo: 'nota',
				titulo: 'Documentar a transição de paisagem',
				descricao: 'Gravar um clipe curto de cada transporte hoje (barco, transfer) para montar um reel de transição Furong → Wulingyuan. Material de bastidores de viagem.'
			}
		]
	},
	{
		diaId: 'dia-13',
		destino: 'Zhangjiajie National Forest Park',
		ideias: [
			{
				tipo: 'foto',
				titulo: 'Avatar Mountains — pilares flutuando na névoa',
				descricao: 'Yuanjiajie — câmera apontada para os pilares de arenito com nuvens baixas passando. Esperar o vento mover a neblina para criar o efeito de "flutuação". Melhor antes das 9h.',
				melhorHorario: 'Amanhecer'
			},
			{
				tipo: 'reel',
				titulo: 'Bailong Elevator — subida em vidro',
				descricao: 'Dentro do elevador de vidro — câmera apontada pra baixo capturando a descida vertical de 326m em speed ramp. Usar modo câmera lenta na chegada ao topo.',
				melhorHorario: 'Manhã'
			},
			{
				tipo: 'foto',
				titulo: 'Tianzi Mountain — vista do cume',
				descricao: 'No mirante do cume — câmera apontada para o mar de pilares no horizonte. Incluir algum elemento em primeiro plano (pedra, planta) para dar profundidade.',
				melhorHorario: 'Manhã'
			},
			{
				tipo: 'story',
				titulo: 'Contexto Avatar para seguidores',
				descricao: 'Gravar 15s em frente a um pilar icônico e contar rapidamente que o Pandora de Avatar foi inspirado aqui. Colocar uma frame do filme como referência no story.'
			}
		]
	},
	{
		diaId: 'dia-14',
		destino: 'Tianmen + Grand Canyon',
		ideias: [
			{
				tipo: 'foto',
				titulo: 'Porta do Paraíso — Tianmen',
				descricao: 'Dentro do arco de Tianmen — câmera centralizada enquadrando o céu através do arco de pedra. Subir as 999 degraus e fotografar de dentro olhando pra fora com a paisagem ao fundo.',
				melhorHorario: 'Manhã'
			},
			{
				tipo: 'reel',
				titulo: 'Passarela de vidro do Grand Canyon',
				descricao: 'Na passarela de vidro — câmera apontada pra baixo mostrando o vazio de centenas de metros. Andar devagar, câmera estável. Gravar a reação genuína ao pisar pela primeira vez.',
				melhorHorario: 'Tarde'
			},
			{
				tipo: 'story',
				titulo: 'Teleférico mais longo do mundo',
				descricao: 'No teleférico de Tianmen — câmera para fora da janela capturando a floresta e montanhas embaixo. Legendar "teleférico mais longo da China — 7,4km".'
			}
		]
	},
	{
		diaId: 'dia-15',
		destino: 'ZJJ → Changsha → Bangkok → Krabi',
		ideias: [
			{
				tipo: 'story',
				titulo: 'Maglev de Changsha',
				descricao: 'Gravar o painel de velocidade dentro do maglev atingindo 100+ km/h. Câmera na janela mostrando a aceleração. Legendar "de trem bala pra avião em menos de 1h".'
			},
			{
				tipo: 'nota',
				titulo: 'Registrar a transição China → Tailândia',
				descricao: 'Ao chegar em Krabi à noite, gravar 10s do céu estrelado ou do ar úmido tropical. Contraste dramático com a China. Material de abertura para o bloco Tailândia.'
			}
		]
	},
	{
		diaId: 'dia-16',
		destino: 'Ao Nang → Phi Phi',
		ideias: [
			{
				tipo: 'reel',
				titulo: 'Chegada de ferry em Phi Phi',
				descricao: 'Na proa do ferry — câmera apontada para Phi Phi surgindo no horizonte com os paredões de pedra calcária. Gravar desde longe até o atracamento. Material de abertura épico.',
				melhorHorario: 'Manhã'
			},
			{
				tipo: 'foto',
				titulo: 'Viewpoint Phi Phi — vista dupla',
				descricao: 'No mirante — câmera capturando as duas baías (Loh Dalum e Tonsai) separadas pela faixa estreita de terra com matas ao redor. Chegar cedo para evitar aglomeração.',
				melhorHorario: 'Manhã cedo'
			},
			{
				tipo: 'story',
				titulo: 'Loh Dalum Beach ao entardecer',
				descricao: 'Na praia — gravar o reflexo do céu laranja na água rasa com longboats ao fundo. Câmera rente à areia, horizontal. Sem filtro; a cor natural já é suficiente.',
				melhorHorario: 'Pôr do sol'
			}
		]
	},
	{
		diaId: 'dia-17',
		destino: 'Phi Phi — Longtail Privado',
		ideias: [
			{
				tipo: 'reel',
				titulo: 'Maya Bay — amanhecer antes dos grupos',
				descricao: 'Antes de 8h, a praia ainda está vazia — câmera no nível da areia molhada capturando o azul turquesa sem ninguém. Gravar uma corrida na areia em câmera lenta. Ouro puro.',
				melhorHorario: 'Amanhecer'
			},
			{
				tipo: 'foto',
				titulo: 'Pileh Lagoon — verde esmeralda fechado',
				descricao: 'Da proa do longtail na lagoa — câmera capturando os paredões de calcário envoltos em verde com a água completamente fechada. Sem flash; usar luz natural que entra pelo topo.',
				melhorHorario: 'Manhã'
			},
			{
				tipo: 'story',
				titulo: 'Longtail privado em movimento',
				descricao: 'Da popa do barco — gravar a esteira de espuma branca com ilhas ao fundo enquanto o motor abre caminho. Câmera rente à água. Não precisa de legenda — a imagem fala.'
			},
			{
				tipo: 'foto',
				titulo: 'Viking Cave — ninhos nas paredes',
				descricao: 'Do longtail passando pela entrada — câmera com zoom suave capturando os andaimes de bambu nas paredes da gruta onde coletam ninhos de andorinha. Luz dramática contra-luz.',
				melhorHorario: 'Manhã'
			}
		]
	},
	{
		diaId: 'dia-18',
		destino: 'Railay + The Grotto',
		ideias: [
			{
				tipo: 'foto',
				titulo: 'Phra Nang Beach — calcário + turquesa',
				descricao: 'Na praia de Phra Nang — câmera baixa, capturar paredão de calcário no canto esquerdo e o turquesa absurdo da água. Uma das mais fotogênicas do mundo. Manhã com luz suave.',
				melhorHorario: 'Manhã'
			},
			{
				tipo: 'reel',
				titulo: 'The Grotto — jantar na caverna',
				descricao: 'Mesa posta dentro da caverna calcária com velas — câmera nas chamas refletindo no teto molhado, depois zoom out revelando o ambiente completo. Ritmo lento, elegante.',
				melhorHorario: '18h30'
			},
			{
				tipo: 'story',
				titulo: 'Chegada de barco em Railay',
				descricao: 'Só se chega de barco — gravar a chegada desembarcando direto na praia com os paredões de calcário atrás. Legendar "praia acessível apenas de barco, sem estrada".'
			}
		]
	},
	{
		diaId: 'dia-19',
		destino: 'Ao Nang → Chiang Mai',
		ideias: [
			{
				tipo: 'story',
				titulo: 'Manhã leve no bar de praia',
				descricao: 'Mesa na areia com café ou suco — câmera capturando o mar de fundo enquanto bebe. Gravar simples, sem legenda. Deixar o cenário contar a história.',
				melhorHorario: 'Manhã'
			},
			{
				tipo: 'nota',
				titulo: 'Registrar primeiros passos em Chiang Mai',
				descricao: 'Ao chegar no Casa Nimman, gravar a rua em volta do hotel à noite — atmosfera bohemian, cafés abertos, scooters passando. Material de ambientação para o bloco Chiang Mai.'
			}
		]
	},
	{
		diaId: 'dia-20',
		destino: 'Yi Peng / CAD',
		ideias: [
			{
				tipo: 'reel',
				titulo: 'Soltura de lanternas Yi Peng',
				descricao: 'Na área VIP — câmera capturando a soltura em massa com centenas de lanternas subindo simultaneamente. Usar câmera lenta e depois velocidade normal. Não falar, deixar o som ambiente.',
				melhorHorario: 'Noite'
			},
			{
				tipo: 'foto',
				titulo: 'Lanterna própria subindo',
				descricao: 'Segurar a lanterna com as mãos abertas antes de soltar — câmera de baixo para cima contra o céu com outras lanternas ao fundo já subindo. Luz quente da lanterna no rosto.',
				melhorHorario: 'Noite'
			},
			{
				tipo: 'story',
				titulo: 'Contexto cultural do festival',
				descricao: 'Antes da soltura, gravar 20s explicando o significado espiritual: soltar as lanternas é uma prece, não só um espetáculo. Aumenta o valor do conteúdo e respeita a tradição.'
			}
		]
	},
	{
		diaId: 'dia-21',
		destino: 'Loi Krathong — Chiang Mai',
		ideias: [
			{
				tipo: 'foto',
				titulo: 'Krathong flutuando no Rio Ping',
				descricao: 'Câmera rente à água capturando a vela acesa no centro do kratong (bandeja de folha de bananeira) com dezenas de outros ao fundo desfocados. Luz da vela no rosto de quem solta.',
				melhorHorario: 'Noite'
			},
			{
				tipo: 'reel',
				titulo: 'Desfile na Tha Phae Gate',
				descricao: 'Na Gate — câmera capturando o desfile de trajes tradicionais tailandeses. Usar slow motion nas fantasias elaboradas. Gravar de cima se possível, ou de lado para pegar a profundidade do desfile.',
				melhorHorario: 'Tarde/noite'
			},
			{
				tipo: 'foto',
				titulo: 'Doi Suthep com névoa matinal',
				descricao: 'No templo ao amanhecer — câmera capturando os chedis dourados com neblina ao redor. Incluir monge em laranja passando se possível. Luz difusa da manhã cedo.',
				melhorHorario: 'Manhã cedo'
			},
			{
				tipo: 'story',
				titulo: 'Templos iluminados à noite',
				descricao: 'Walk-through rápido de 20s pelos templos com iluminação especial de festival — câmera no peito, movimento constante. Legendar data e nome do festival.'
			}
		]
	},
	{
		diaId: 'dia-22',
		destino: 'Chiang Mai → Bangkok',
		ideias: [
			{
				tipo: 'story',
				titulo: 'Self-transfer em Khon Kaen',
				descricao: 'Gravar 10s do aeroporto pequeno de Khon Kaen e legendar "você sabe que viajou muito quando acha esse aeroporto charmoso". Conteúdo relatable para viajantes.'
			},
			{
				tipo: 'nota',
				titulo: 'Revisão do bloco Tailândia Norte',
				descricao: 'No voo ou espera, revisar mentalmente e anotar: o que ainda não foi documentado de Chiang Mai, Phi Phi e Krabi. Amanhã em Bangkok é a última chance de buscar conteúdo pendente.'
			}
		]
	},
	{
		diaId: 'dia-23',
		destino: 'Bangkok',
		ideias: [
			{
				tipo: 'foto',
				titulo: 'Wat Arun ao amanhecer no Chao Phraya',
				descricao: 'Do barco no Rio Chao Phraya — câmera capturando Wat Arun refletido na água com a luz dourada da manhã. Usar modo portrait para desfocar levemente o reflexo e valorizar o templo.',
				melhorHorario: 'Amanhecer'
			},
			{
				tipo: 'reel',
				titulo: 'Yaowarat Chinatown — caos gastronômico',
				descricao: 'Walk-through noturno pela Yaowarat Road — câmera no peito capturando barracas de frutos do mar gigantes, letreiros neon vermelhos e a multidão. Não usar flash. 30s de imersão total.',
				melhorHorario: 'Noite'
			},
			{
				tipo: 'story',
				titulo: 'Barco nos canais de Bangkok',
				descricao: 'Do barco passando pelos klongs — câmera capturando casas na beira da água, templos e vegetação densa. Legendar "Bangkok tem mais de 2.000km de canais".'
			}
		]
	},
	{
		diaId: 'dia-24',
		destino: 'Bangkok (despedida)',
		ideias: [
			{
				tipo: 'reel',
				titulo: 'Chatuchak Market — ângulo de cima',
				descricao: 'Se conseguir chegar em algum mezanino ou estrutura elevada — câmera capturando o labirinto de corredores de tendas do maior mercado ao ar livre do mundo. Alternativa: gravar o mapa gigante na entrada.',
				melhorHorario: 'Manhã'
			},
			{
				tipo: 'foto',
				titulo: 'Rooftop bar — Bangkok skyline',
				descricao: 'Do rooftop à noite — câmera capturando a imensidão de Bangkok iluminada. Incluir um drink/mesa em primeiro plano para contexto. Usar modo noturno sem flash.',
				melhorHorario: 'Noite'
			},
			{
				tipo: 'story',
				titulo: 'Despedida da Ásia',
				descricao: 'Gravar um clipe de 20s na última noite olhando para a cidade — pode ser do hotel, de um bar, de qualquer lugar alto. Falar livremente o que a viagem significou. Material autêntico.'
			}
		]
	},
	{
		diaId: 'dia-25',
		destino: 'Bangkok → São Paulo',
		ideias: [
			{
				tipo: 'story',
				titulo: 'Check-out às 6h30',
				descricao: 'Gravar o lobby do hotel com as malas prontas ainda de madrugada — câmera no tripé ou apoiada, autoretrato rápido. Legendar "25 dias. Agora é hora de voltar".'
			},
			{
				tipo: 'reel',
				titulo: 'Compilado da viagem no voo de volta',
				descricao: 'Usar o tempo de voo (BKK → IST → GRU, mais de 20h) para montar o reel de encerramento com os melhores clips. Selecionar 1 clip icônico de cada destino. Música épica, sem narração.'
			},
			{
				tipo: 'nota',
				titulo: 'Lista de conteúdo pendente',
				descricao: 'Anotar tudo que ficou em aberto: edições, legendas, posts agendados. Definir calendário de publicação para as próximas semanas antes de pousar.'
			}
		]
	}
];
