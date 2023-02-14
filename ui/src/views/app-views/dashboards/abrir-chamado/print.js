import React, { useRef } from 'react'
import { PrinterOutlined } from '@ant-design/icons';
import { Card, Button } from 'antd';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
import { Link } from 'react-router-dom';

export const ImprimirOrdemDeServico = (props) => {
	const { ordemDeServico, togglePrintView } = props;
	const refPrintContent = useRef();

	return (
		<div className="container">
			<Link style={{ fontSize: '1.6rem', marginBottom: '2rem' }} onClick={togglePrintView}>
				Voltar para OS
			</Link>
			<Card style={{ marginTop: '1.5rem' }}>
				<Card ref={refPrintContent}>
					<div
						className="d-md-flex justify-content-md-between"
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between'
						}}
					>
						<div className="text-left">
							<img src="/img/sathi-logo.png" alt="" style={{ marginBottom: '1rem' }} />
							<address>
								<p>
									<span className="font-weight-semibold text-dark font-size-md">Sathi Informatica</span><br />
									<span>00.439.616/0001-63</span><br />
									<span>Rua Frei Manoel da Ressureicao, 339</span><br />
									<span>Guanabara</span><br />
									<span>Campinas/SP</span><br />
									<span>13073-027</span><br />
									<abbr className="text-dark" title="Phone">Telefone:</abbr>
									<span>(19) 3705-1414</span>
								</p>
							</address>
						</div>
						<div className="text-right">
							<h2 className="mb-1 font-weight-semibold">OS: {ordemDeServico.numero}</h2>
							<h5 className="mb-1 font-weight-semibold">{ ordemDeServico.tipo_ordem_servico }</h5>
							<p>
								{
								new Intl.DateTimeFormat("pt-BR", {
									year: "numeric",
									month: "2-digit",
									day: "2-digit",
									hour: "numeric",
									minute: "numeric",
								}).format(new Date(ordemDeServico.created_at))
								}
							</p>
							<br />
							<address>
								<p>
									<span className="font-weight-semibold text-dark font-size-md">{ ordemDeServico.nome_fantasia }</span><br />
									<span>{ ordemDeServico.cliente_endereco }</span><br />
									<span>{ ordemDeServico.cliente_cidade_estado }</span><br />
									<span>{ `${ordemDeServico.cliente_bairro} ${ordemDeServico.cliente_cep} ` }</span><br />
								</p>
							</address>
						</div>
					</div>

					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-around',
							marginTop: '2rem',
							marginBottom: '3rem',
							paddingBottom: '2rem',
							borderBottom: '1px solid #D8E2E7'
						}}
					>
						<div>
							<h5>ABERTURA</h5>
							<span>10/10/2023</span>
						</div>
						<div>
							<h5>CHEGADA</h5>
							<span>10/10/2023 - 10:25s</span>
						</div>
						<div>
							<h5>SAIDA</h5>
							<span>10/10/2023 - 14:35</span>
						</div>
					</div>

					<div className="mt-4" style={{ marginTop: '2.5rem' }}>
						<h1 style={{ fontSize: '1.1rem', fontWeight: '300', letterSpacing: '0.3rem' }}>PROBLEMA</h1>
						<span style={{ paddingLeft: '2rem', color: '#72849a' }}>
							{ ordemDeServico.descricao }
						</span>
					</div>

					<div className="mt-4" style={{ marginTop: '2.5rem' }}>
						<h1 style={{ fontSize: '1.1rem', fontWeight: '300', letterSpacing: '0.3rem' }}>SOLUCAO</h1>
						<span style={{ paddingLeft: '2rem', color: '#72849a' }}>
							{ ordemDeServico.solucao }
						</span>
					</div>

					<div className="mt-4" style={{ marginTop: '2.5rem' }}>
						<h1 style={{ fontSize: '1.1rem', fontWeight: '300', letterSpacing: '0.3rem' }}>PENDENCIA</h1>
						<span style={{ paddingLeft: '2rem', color: '#72849a' }}>
							{ ordemDeServico.consumo }
						</span>
					</div>

					<div className="mt-4" style={{ marginTop: '2.5rem' }}>
						<h1 style={{ fontSize: '1.1rem', fontWeight: '300', letterSpacing: '0.3rem' }}>OBSERVACOES</h1>
						<span style={{ paddingLeft: '2rem', color: '#72849a' }}>
							{ ordemDeServico.observacao }
						</span>
					</div>

					<div className="mt-2">
						<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
						<span style={{ fontSize: '0.8rem', fontWeight: '300', letterSpacing: '0.3rem', marginTop: '2rem' }}>ASSINATURA</span>
							<div className="text-right ">
								<div className="border-bottom">
									<p className="mb-2">
										<img src={`${ordemDeServico.assinatura}`} style={{ width: '40rem' }} />
									</p>
								</div>
							</div>
						</div>
					</div>
				</Card>
				
				<hr className="d-print-none"/>
				<div className="text-right d-print-none">
					<ReactToPrint
						trigger={() => (
							<Button type="primary">
								<PrinterOutlined  type="printer" />
								<span className="ml-1">Imprimir</span>
							</Button>
						)}
						content={() => refPrintContent.current}
					/>
				</div>

			</Card>
		</div>
	);
}

export default ImprimirOrdemDeServico
