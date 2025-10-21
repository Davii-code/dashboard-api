import { SwaggerOptions } from 'swagger-ui-express';

export const swaggerDocument: SwaggerOptions = {
    openapi: '3.0.0',
    info: {
        title: 'Dashboard API',
        version: '1.0.0',
        description:
            'API RESTful dinâmica para retornar dados formatados para gráficos (pizza, linha, barra).',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Servidor local',
        },
    ],
    paths: {
        '/dashboard': {
            get: {
                summary: 'Obtém dados formatados para o tipo de gráfico solicitado',
                description:
                    'Retorna dados do banco de dados formatados conforme o tipo de gráfico informado (pizza, linha ou barra).',
                parameters: [
                    {
                        name: 'tipoGrafico',
                        in: 'query',
                        required: true,
                        schema: { type: 'string', enum: ['pizza', 'linha', 'barra'] },
                        description: 'Tipo de gráfico desejado.',
                    },
                    {
                        name: 'dataInicio',
                        in: 'query',
                        required: true,
                        schema: { type: 'string', format: 'date' },
                        description: 'Data inicial no formato YYYY-MM-DD.',
                    },
                    {
                        name: 'dataFim',
                        in: 'query',
                        required: true,
                        schema: { type: 'string', format: 'date' },
                        description: 'Data final no formato YYYY-MM-DD.',
                    },
                ],
                responses: {
                    200: {
                        description: 'Dados retornados com sucesso.',
                        content: {
                            'application/json': {
                                example: {
                                    type: 'pie',
                                    labels: ['Eletrônicos', 'Roupas', 'Alimentos'],
                                    data: [1200.5, 950.0, 800.75],
                                },
                            },
                        },
                    },
                    400: {
                        description: 'Erro de validação nos parâmetros.',
                        content: {
                            'application/json': {
                                example: { message: 'Parâmetros "dataInicio" e "dataFim" são obrigatórios.' },
                            },
                        },
                    },
                    500: {
                        description: 'Erro interno do servidor.',
                        content: {
                            'application/json': {
                                example: { message: 'Erro interno do servidor.' },
                            },
                        },
                    },
                },
            },
        },
    },
};
