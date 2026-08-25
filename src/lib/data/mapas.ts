// claude: dados de mapas offline por destino — TravelOS Ásia 2026

export interface LinkMapa {
	label: string;
	url: string;
	tipo: 'google' | 'mapas-me' | 'baidu' | 'other';
}

export interface MapaDestino {
	id: string;
	cidade: string;
	pais: string;
	emoji: string;
	diaInicio: string;
	diaFim: string;
	alertaOffline?: string;
	links: LinkMapa[];
}

export const destinos: MapaDestino[] = [
	{
		id: 'istambul',
		cidade: 'Istambul',
		pais: 'Turquia',
		emoji: '🇹🇷',
		diaInicio: 'dia-02',
		diaFim: 'dia-02',
		links: [
			{
				label: 'Google Maps',
				url: 'https://www.google.com/maps/search/Istanbul,+Turkey',
				tipo: 'google'
			},
			{
				label: 'Maps.me — baixar mapa offline',
				url: 'https://maps.me/',
				tipo: 'mapas-me'
			}
		]
	},
	{
		id: 'bangkok-conexao',
		cidade: 'Bangkok (conexão)',
		pais: 'Tailândia',
		emoji: '🇹🇭',
		diaInicio: 'dia-03',
		diaFim: 'dia-03',
		links: [
			{
				label: 'Google Maps',
				url: 'https://www.google.com/maps/search/Bangkok,+Thailand',
				tipo: 'google'
			},
			{
				label: 'Maps.me — baixar mapa offline',
				url: 'https://maps.me/',
				tipo: 'mapas-me'
			}
		]
	},
	{
		id: 'hanoi',
		cidade: 'Hanói',
		pais: 'Vietnã',
		emoji: '🇻🇳',
		diaInicio: 'dia-03',
		diaFim: 'dia-08',
		links: [
			{
				label: 'Google Maps',
				url: 'https://www.google.com/maps/search/Hanoi,+Vietnam',
				tipo: 'google'
			},
			{
				label: 'Maps.me — baixar mapa offline',
				url: 'https://maps.me/',
				tipo: 'mapas-me'
			}
		]
	},
	{
		id: 'ha-long',
		cidade: 'Ha Long Bay',
		pais: 'Vietnã',
		emoji: '🇻🇳',
		diaInicio: 'dia-04',
		diaFim: 'dia-04',
		links: [
			{
				label: 'Google Maps',
				url: 'https://www.google.com/maps/search/Ha+Long+Bay,+Vietnam',
				tipo: 'google'
			},
			{
				label: 'Maps.me — baixar mapa offline',
				url: 'https://maps.me/',
				tipo: 'mapas-me'
			}
		]
	},
	{
		id: 'sapa',
		cidade: 'Sa Pa',
		pais: 'Vietnã',
		emoji: '🇻🇳',
		diaInicio: 'dia-05',
		diaFim: 'dia-07',
		links: [
			{
				label: 'Google Maps',
				url: 'https://www.google.com/maps/search/Sa+Pa,+Vietnam',
				tipo: 'google'
			},
			{
				label: 'Maps.me — baixar mapa offline',
				url: 'https://maps.me/',
				tipo: 'mapas-me'
			}
		]
	},
	{
		id: 'chongqing',
		cidade: 'Chongqing',
		pais: 'China',
		emoji: '🇨🇳',
		diaInicio: 'dia-09',
		diaFim: 'dia-11',
		alertaOffline: '⚠️ Google Maps bloqueado — use Maps.me ou Baidu Maps',
		links: [
			{
				label: 'Maps.me — baixar mapa offline',
				url: 'https://maps.me/',
				tipo: 'mapas-me'
			},
			{
				label: 'Baidu Maps',
				url: 'https://map.baidu.com/search/重庆/',
				tipo: 'baidu'
			}
		]
	},
	{
		id: 'furong',
		cidade: 'Furong / Xiaozhangjiajie',
		pais: 'China',
		emoji: '🇨🇳',
		diaInicio: 'dia-11',
		diaFim: 'dia-12',
		alertaOffline: '⚠️ Google Maps bloqueado — use Maps.me ou Baidu Maps',
		links: [
			{
				label: 'Maps.me — baixar mapa offline',
				url: 'https://maps.me/',
				tipo: 'mapas-me'
			},
			{
				label: 'Baidu Maps',
				url: 'https://map.baidu.com/search/芙蓉镇/',
				tipo: 'baidu'
			}
		]
	},
	{
		id: 'wulingyuan',
		cidade: 'Wulingyuan / Zhangjiajie NP',
		pais: 'China',
		emoji: '🇨🇳',
		diaInicio: 'dia-12',
		diaFim: 'dia-14',
		alertaOffline: '⚠️ Google Maps bloqueado — use Maps.me ou Baidu Maps',
		links: [
			{
				label: 'Maps.me — baixar mapa offline',
				url: 'https://maps.me/',
				tipo: 'mapas-me'
			},
			{
				label: 'Baidu Maps',
				url: 'https://map.baidu.com/search/武陵源/',
				tipo: 'baidu'
			}
		]
	},
	{
		id: 'zhangjiajie',
		cidade: 'Zhangjiajie',
		pais: 'China',
		emoji: '🇨🇳',
		diaInicio: 'dia-14',
		diaFim: 'dia-15',
		alertaOffline: '⚠️ Google Maps bloqueado — use Maps.me ou Baidu Maps',
		links: [
			{
				label: 'Maps.me — baixar mapa offline',
				url: 'https://maps.me/',
				tipo: 'mapas-me'
			},
			{
				label: 'Baidu Maps',
				url: 'https://map.baidu.com/search/张家界/',
				tipo: 'baidu'
			}
		]
	},
	{
		id: 'krabi',
		cidade: 'Krabi / Phi Phi',
		pais: 'Tailândia',
		emoji: '🇹🇭',
		diaInicio: 'dia-15',
		diaFim: 'dia-18',
		links: [
			{
				label: 'Google Maps',
				url: 'https://www.google.com/maps/search/Krabi,+Thailand',
				tipo: 'google'
			},
			{
				label: 'Maps.me — baixar mapa offline',
				url: 'https://maps.me/',
				tipo: 'mapas-me'
			}
		]
	},
	{
		id: 'railay',
		cidade: 'Railay / Ao Nang',
		pais: 'Tailândia',
		emoji: '🇹🇭',
		diaInicio: 'dia-18',
		diaFim: 'dia-18',
		links: [
			{
				label: 'Google Maps',
				url: 'https://www.google.com/maps/search/Railay+Beach,+Krabi,+Thailand',
				tipo: 'google'
			},
			{
				label: 'Maps.me — baixar mapa offline',
				url: 'https://maps.me/',
				tipo: 'mapas-me'
			}
		]
	},
	{
		id: 'chiang-mai',
		cidade: 'Chiang Mai',
		pais: 'Tailândia',
		emoji: '🇹🇭',
		diaInicio: 'dia-19',
		diaFim: 'dia-21',
		links: [
			{
				label: 'Google Maps',
				url: 'https://www.google.com/maps/search/Chiang+Mai,+Thailand',
				tipo: 'google'
			},
			{
				label: 'Maps.me — baixar mapa offline',
				url: 'https://maps.me/',
				tipo: 'mapas-me'
			}
		]
	},
	{
		id: 'bangkok',
		cidade: 'Bangkok',
		pais: 'Tailândia',
		emoji: '🇹🇭',
		diaInicio: 'dia-22',
		diaFim: 'dia-25',
		links: [
			{
				label: 'Google Maps',
				url: 'https://www.google.com/maps/search/Bangkok,+Thailand',
				tipo: 'google'
			},
			{
				label: 'Maps.me — baixar mapa offline',
				url: 'https://maps.me/',
				tipo: 'mapas-me'
			}
		]
	}
];

// group by country for rendering
export const destinosPorPais = destinos.reduce<Record<string, MapaDestino[]>>((acc, d) => {
	if (!acc[d.pais]) acc[d.pais] = [];
	acc[d.pais].push(d);
	return acc;
}, {});

// ordered list of countries as they appear in the trip
export const paisesOrdenados = [...new Set(destinos.map((d) => d.pais))];
