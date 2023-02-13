const { Router } = require('express');
const passport = require('passport');
const { sequelize } = require('../entities');
const { v4 } = require('uuid');
const { OrdemServico, Usuario, Cliente, StatusOrdemServico } = require('../entities');
const { novaOrdemServicoSchema, atualizaOrdemServicoSchema } = require('./schemas/ordens-de-servico');
const { PERFIL_CLIENTE } = require('../authentication/constants');
const router = Router();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const isPerfilCliente = req.user.perfil === PERFIL_CLIENTE.id;
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const offset = (page - 1) * limit;
    const userId = isPerfilCliente ? req.user.id : undefined;
    const clienteId = req.user.cliente;

    const {
      os,
      tipo,
      status,
      cliente,
      data_inicio,
      data_fim
    } = req.query;

    let whereClause = '';

    if (clienteId) {
      whereClause += "AND (CLI.id IS NULL OR CLI.id::text = :user) ";
    }
    if (os) {
      whereClause += "AND (OS.numero IS NULL OR OS.numero ILIKE :os) ";
    }
    if (tipo) {
      whereClause += "AND (TOS.id IS NULL OR TOS.id::text = :tipo) ";
    }
    if (status) {
      whereClause += "AND (SOS.id IS NULL OR SOS.id::text = :status) ";
    }
    if (cliente) {
      whereClause += "AND (CLI.nome_fantasia IS NULL OR CLI.nome_fantasia ILIKE :cliente) ";
    }
    if (data_inicio) {
      whereClause += "AND (OS.created_at IS NULL OR OS.created_at >= :data_inicio) ";
    }
    if (data_fim) {
      whereClause += "AND (OS.created_at IS NULL OR OS.created_at <= :data_fim) ";
    }

    const baseSqlCommand = `
      FROM
        ordens_de_servico as OS
      LEFT JOIN
        status_ordem_servico as SOS ON OS.status_ordem_servico_id = SOS.id
      LEFT JOIN
        tipo_ordem_servico as TOS ON OS.tipo_ordem_servico_id = TOS.id
      LEFT JOIN
        clientes as CLI ON OS.cliente_id = CLI.id
      LEFT JOIN
        usuarios as USU ON OS.usuario_id = USU.id
      WHERE
        TRUE
      ${whereClause}
    `;

    const dataSqlCommand = `
      SELECT
        OS.*,
        SOS.description as "status_ordem_servico",
        TOS.description as "tipo_ordem_servico",
        CLI.nome_fantasia,
        USU.nome
      ${baseSqlCommand}
      ORDER BY OS.created_at DESC
      LIMIT ${limit} OFFSET ${offset};
    `;
    const dataCountSqlCommand = `
      SELECT COUNT(OS.id)
      ${baseSqlCommand}
    `;

    const queryParameters = {
      replacements: {
        user: `${clienteId || ""}`,
        os: `%${os || ""}%`,
        tipo: `${tipo || ""}`,
        status: `${status || ""}`,
        cliente: `%${cliente || ""}%`,
        data_inicio: `${data_inicio || ""}`,
        data_fim: `${data_fim || ""}`,
      },
      type: sequelize.QueryTypes.SELECT,
    };

    try {
      const ordensDeServico = await sequelize.query(dataSqlCommand, queryParameters);
      const countResult = await sequelize.query(dataCountSqlCommand, queryParameters);

      const count = countResult[0].count
      const totalPages = Math.ceil(count / limit);

      return res.json({
        data: ordensDeServico,
        pagination: {
          page,
          limit,
          totalPages,
          total: count
        }
      });
    }
    catch(er) {
      console.log(er);
    }
});

router.get('/quadro-laboratorio',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (req.user.perfil === PERFIL_CLIENTE.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
      const ordensDeServico = await sequelize.query(`
        SELECT
          OS.*,
          SOS.description as "status_ordem_servico",
          TOS.description as "tipo_ordem_servico",
          CLI.nome_fantasia,
          USU.nome
        FROM
          ordens_de_servico as OS
        LEFT JOIN
          status_ordem_servico as SOS ON OS.status_ordem_servico_id = SOS.id
        LEFT JOIN
          tipo_ordem_servico as TOS ON OS.tipo_ordem_servico_id = TOS.id
        LEFT JOIN
          clientes as CLI ON OS.cliente_id = CLI.id
        LEFT JOIN
          usuarios as USU ON OS.usuario_id = USU.id
        WHERE
          OS.status_ordem_servico_id IN (
            'cbe8b932-90ca-4a5b-84e4-3aa91571a0cb',
            '5c1795fd-8856-4c44-85fd-f1488cb5489b',
            '1cdf403c-9da1-4a8e-b2fc-3e356d9815ff'
          )
        AND
          OS.tipo_ordem_servico_id = 'f6d1944a-7569-4668-bae6-c6fe4f36eb29'
        ORDER BY OS.created_at DESC
        LIMIT ${2000} OFFSET ${0};
      `);

      return res.json({
        data: ordensDeServico[0],
      });
    }
    catch(er) {
      console.log(er);
    }
});

router.get('/quadro-campo',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (req.user.perfil === PERFIL_CLIENTE.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const ordensDeServico = await sequelize.query(`
        SELECT
          OS.*,
          SOS.description as "status_ordem_servico",
          TOS.description as "tipo_ordem_servico",
          CLI.nome_fantasia,
          USU.nome
        FROM
          ordens_de_servico as OS
        LEFT JOIN
          status_ordem_servico as SOS ON OS.status_ordem_servico_id = SOS.id
        LEFT JOIN
          tipo_ordem_servico as TOS ON OS.tipo_ordem_servico_id = TOS.id
        LEFT JOIN
          clientes as CLI ON OS.cliente_id = CLI.id
        LEFT JOIN
          usuarios as USU ON OS.usuario_id = USU.id
        WHERE
          OS.status_ordem_servico_id IN (
            'cbe8b932-90ca-4a5b-84e4-3aa91571a0cb',
            '5c1795fd-8856-4c44-85fd-f1488cb5489b',
            '1cdf403c-9da1-4a8e-b2fc-3e356d9815ff'
          )
        AND
          OS.tipo_ordem_servico_id = '9957342c-815e-47b4-8d16-62fe4432ee59'
        ORDER BY OS.created_at DESC
        LIMIT ${2000} OFFSET ${0};
      `);

      return res.json({
        data: ordensDeServico[0],
      });
    }
    catch(er) {
      console.log(er);
    }
});

router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (req.user.perfil === PERFIL_CLIENTE.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const id = req.params.id || undefined;

    if (!id) {
      return res.status(404).json({ message: 'Ordem de Servico nao informada!' });
    }

    try {
      const [ordemDeServicoResult, metadata] = await sequelize.query(`
        SELECT
          OS.*,
          SOS.description as "status_ordem_servico",
          TOS.description as "tipo_ordem_servico",
          CLI.nome_fantasia,
          CLI.endereco AS "cliente_endereco",
          CLI.bairro AS "cliente_bairro",
          CLI.numero AS "cliente_numero",
          CLI.cidade_estado AS "cliente_cidade_estado",
          CLI.cep AS "cliente_cep",
          USU.nome
        FROM
          ordens_de_servico as OS
        LEFT JOIN
          status_ordem_servico as SOS ON OS.status_ordem_servico_id = SOS.id
        LEFT JOIN
          tipo_ordem_servico as TOS ON OS.tipo_ordem_servico_id = TOS.id
        LEFT JOIN
          clientes as CLI ON OS.cliente_id = CLI.id
        LEFT JOIN
          usuarios as USU ON OS.usuario_id = USU.id
        WHERE
          OS.id = '${id}';
      `);

      if (metadata.rowCount <= 0) {
        return res.status(404).json({ message: 'Ordem de Servico nao encontrada!' });
      }

      return res.json({
        data: ordemDeServicoResult[0]
      });
    }
    catch(er) {
      console.log(er);
    }
});

router.post('/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (req.user.perfil === PERFIL_CLIENTE.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const body = req.body;

    const { error } = novaOrdemServicoSchema.validate(body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const id = v4();
    const numero = id.substring(0,8)

    const createOsPayload = {
      id,
      numero,
      ...body
    };
    const createdOS = await OrdemServico.create(createOsPayload);
    return res.json(createdOS);
});

router.put('/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    const { error } = atualizaOrdemServicoSchema.validate(body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    await OrdemServico.update(body, {
      where: {
        id
      }
    });

    const updatedOS = {
      id,
      ...body
    }

    return res.json(updatedOS);
});

module.exports = router;
