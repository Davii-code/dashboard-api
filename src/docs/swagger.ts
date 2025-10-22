import { SwaggerOptions } from 'swagger-ui-express';

export const swaggerDocument: SwaggerOptions = {
    openapi: '3.0.0',
    info: {
        title: 'Dashboard API',
        version: '1.1.0',
        description: 'API para dados de dashboard (pie/line/bar) com filtro de período.',
    },
    servers: [{ url: 'http://localhost:3000', description: 'local' }],
    paths: {
        '/dashboard': {
            get: {
                summary: 'Retorna dados formatados para o gráfico solicitado',
                parameters: [
                    {
                        name: 'tipoGrafico',
                        in: 'query',
                        required: true,
                        schema: { type: 'string', enum: ['pie', 'line', 'bar', 'pizza', 'linha', 'barra'] },
                    },
                    {
                        name: 'dataInicio',
                        in: 'query',
                        required: true,
                        schema: { type: 'string', format: 'date' },
                    },
                    {
                        name: 'dataFim',
                        in: 'query',
                        required: true,
                        schema: { type: 'string', format: 'date' },
                    },
                ],
                responses: {
                    200: {
                        description: 'OK',
                        content: {
                            'application/json': {
                                examples: {
                                    pie: { value: { type: 'pie', labels: ['Eletrônicos','Roupas'], data: [1200,800] } },
                                    line: { value: { type: 'line', labels: ['2025-01-01','2025-01-02'], data: [300,700] } },
                                    bar: { value: { type: 'bar', labels: ['Notebook','Camiseta'], data: [900,200] } },
                                    message: { value: { message: 'Nenhum dado encontrado para o período informado.' } },
                                },
                            },
                        },
                    },
                    400: { description: 'Parâmetros inválidos' },
                    500: { description: 'Erro interno' },
                },
            },
        },
    },
};
