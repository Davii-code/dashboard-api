import { SwaggerOptions } from 'swagger-ui-express';

export const swaggerDocument: SwaggerOptions = {
    openapi: '3.0.0',
    info: {
        title: 'Dashboard API',
        version: '1.2.0',
        description:
            'API para dados analíticos do dashboard. \n' +
            '- /dashboard entrega dados já formatados para os gráficos (pizza/barras/linha).\n' +
            '- /dashboard/resumo entrega KPIs executivas (total, média, máximo, mínimo, ticket médio, etc.) para os cards.',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Ambiente local',
        },
    ],
    paths: {
        '/dashboard': {
            get: {
                summary: 'Retorna dados prontos para montar um gráfico (pizza, barras ou linha)',
                description:
                    'Este endpoint já devolve labels e valores no formato esperado pelo front.\n' +
                    'Se não houver dados no período, o retorno será { message: string } em vez da série.',
                parameters: [
                    {
                        name: 'tipoGrafico',
                        in: 'query',
                        required: true,
                        description:
                            'Tipo de gráfico desejado. Aceita também sinônimos em PT-BR via backend (ex: "pizza", "barra", "linha").',
                        schema: {
                            type: 'string',
                            enum: ['pie', 'bar', 'line', 'pizza', 'barra', 'linha'],
                            example: 'bar',
                        },
                    },
                    {
                        name: 'dataInicio',
                        in: 'query',
                        required: true,
                        description: 'Data inicial (inclusive). Formato YYYY-MM-DD.',
                        schema: {
                            type: 'string',
                            example: '2025-01-01',
                        },
                    },
                    {
                        name: 'dataFim',
                        in: 'query',
                        required: true,
                        description: 'Data final (inclusive). Formato YYYY-MM-DD.',
                        schema: {
                            type: 'string',
                            example: '2025-01-31',
                        },
                    },
                ],
                responses: {
                    200: {
                        description:
                            'Dados para o gráfico OU mensagem informativa se não há dados.',
                        content: {
                            'application/json': {
                                schema: {
                                    oneOf: [
                                        {
                                            $ref: '#/components/schemas/ChartSeriesResponse',
                                        },
                                        {
                                            $ref: '#/components/schemas/ChartMessageResponse',
                                        },
                                    ],
                                },
                                examples: {
                                    graficoBarras: {
                                        summary: 'Exemplo (bar)',
                                        value: {
                                            type: 'bar',
                                            labels: ['Notebook', 'Camiseta', 'Fone'],
                                            data: [2800, 200, 150],
                                        },
                                    },
                                    graficoLinha: {
                                        summary: 'Exemplo (line)',
                                        value: {
                                            type: 'line',
                                            labels: ['2025-01-01', '2025-01-02', '2025-01-03'],
                                            data: [300, 700, 450],
                                        },
                                    },
                                    graficoPizza: {
                                        summary: 'Exemplo (pie)',
                                        value: {
                                            type: 'pie',
                                            labels: ['Eletrônicos', 'Vestuário', 'Acessórios'],
                                            data: [3100.4, 400, 150],
                                        },
                                    },
                                    semDados: {
                                        summary: 'Nenhum dado no período',
                                        value: {
                                            message:
                                                'Nenhum dado encontrado para o período informado.',
                                        },
                                    },
                                },
                            },
                        },
                    },
                    400: {
                        description: 'Erro de validação (ex. tipoGrafico ausente ou datas inválidas)',
                    },
                    500: {
                        description: 'Erro interno',
                    },
                },
            },
        },

        '/dashboard/resumo': {
            get: {
                summary:
                    'Retorna KPIs executivas do período (cards do dashboard)',
                description:
                    'Endpoint pensado para preencher os cards superiores do dashboard.\n' +
                    'Entrega total, média, máximo, mínimo, ticket médio, quantidade de vendas, e quais foram o produto e a categoria que mais faturaram no período.\n' +
                    'Esses dados vêm prontos para exibição direta; o front não precisa calcular.',
                parameters: [
                    {
                        name: 'dataInicio',
                        in: 'query',
                        required: true,
                        description: 'Data inicial (inclusive). Formato YYYY-MM-DD.',
                        schema: {
                            type: 'string',
                            example: '2025-01-01',
                        },
                    },
                    {
                        name: 'dataFim',
                        in: 'query',
                        required: true,
                        description: 'Data final (inclusive). Formato YYYY-MM-DD.',
                        schema: {
                            type: 'string',
                            example: '2025-01-31',
                        },
                    },
                ],
                responses: {
                    200: {
                        description:
                            'Resumo estatístico e de negócio do período.',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/SummaryMetrics',
                                },
                                example: {
                                    total: 4380.5,
                                    media: 257.67,
                                    maximo: 899.9,
                                    minimo: 15.0,
                                    qtdVendas: 17,
                                    ticketMedio: 257.67,
                                    produtoTop: {
                                        nome: 'Notebook Gamer',
                                        valor: 2800,
                                    },
                                    categoriaTop: {
                                        nome: 'Eletrônicos',
                                        valor: 3100.4,
                                    },
                                    periodo: {
                                        inicio: '2025-01-01',
                                        fim: '2025-01-31',
                                    },
                                },
                            },
                        },
                    },
                    400: {
                        description: 'Erro de validação das datas',
                    },
                    500: {
                        description: 'Erro interno',
                    },
                },
            },
        },
    },

    components: {
        schemas: {
            // quando há dados de gráfico
            ChartSeriesResponse: {
                type: 'object',
                properties: {
                    type: {
                        type: 'string',
                        enum: ['pie', 'bar', 'line'],
                    },
                    labels: {
                        type: 'array',
                        items: { type: 'string' },
                        description: 'Eixo X ou legendas (depende do tipo do gráfico)',
                    },
                    data: {
                        type: 'array',
                        items: { type: 'number' },
                        description: 'Valores numéricos agregados',
                    },
                },
                required: ['type', 'labels', 'data'],
            },

            // quando NÃO há dados no período
            ChartMessageResponse: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        example: 'Nenhum dado encontrado para o período informado.',
                    },
                },
                required: ['message'],
            },

            // retorno do /dashboard/resumo
            SummaryMetrics: {
                type: 'object',
                properties: {
                    total: {
                        type: 'number',
                        description: 'Soma total de amount no período',
                        example: 4380.5,
                    },
                    media: {
                        type: 'number',
                        description: 'Média aritmética dos valores',
                        example: 257.67,
                    },
                    maximo: {
                        type: 'number',
                        description: 'Maior valor individual de venda no período',
                        example: 899.9,
                    },
                    minimo: {
                        type: 'number',
                        description: 'Menor valor individual de venda no período',
                        example: 15.0,
                    },
                    qtdVendas: {
                        type: 'integer',
                        description: 'Total de registros de venda encontrados',
                        example: 17,
                    },
                    ticketMedio: {
                        type: 'number',
                        description: 'Valor médio por venda (total / qtdVendas)',
                        example: 257.67,
                    },
                    produtoTop: {
                        type: 'object',
                        nullable: true,
                        properties: {
                            nome: {
                                type: 'string',
                                example: 'Notebook Gamer',
                            },
                            valor: {
                                type: 'number',
                                example: 2800,
                            },
                        },
                    },
                    categoriaTop: {
                        type: 'object',
                        nullable: true,
                        properties: {
                            nome: {
                                type: 'string',
                                example: 'Eletrônicos',
                            },
                            valor: {
                                type: 'number',
                                example: 3100.4,
                            },
                        },
                    },
                    periodo: {
                        type: 'object',
                        properties: {
                            inicio: {
                                type: 'string',
                                example: '2025-01-01',
                            },
                            fim: {
                                type: 'string',
                                example: '2025-01-31',
                            },
                        },
                    },
                },
                required: [
                    'total',
                    'media',
                    'maximo',
                    'minimo',
                    'qtdVendas',
                    'ticketMedio',
                    'periodo',
                ],
            },
        },
    },
};
