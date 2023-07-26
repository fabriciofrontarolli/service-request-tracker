15 Daily Active Users

# Throughput

## Read

15 DAU
30 Reads Per Minute (1 ler quadro, 1 ler detalhes da OS)

Requests Per Second: 30 / 60 = `0.5 QPS`
Requests Per Minute: 2 * 15 DAU = `30 QPM`  (1 ler quadro, 1 ler detalhes da OS)
Requests Per Hour: 30 * 60 = `18k QPH ~=20k`
Requests Per Day: 20k * 24 = `480k QPD ~= 500k QPD`

## Write

Read/Write Ratio = 5:1 = ~20%

Write Per Second: QPS / 5 = `0.1 WPS`
Write Per Minute: QPM / 5 = `6 WPM`  (1 ler quadro, 1 ler detalhes da OS)
Write Per Hour: QPH / 5 = `4k WPH`
Write Per Day: QPD / 5 = `100k WPD`


## Abertura de Chamado

- Abertura chamado: 25kb

Throughput per day: (WPD) 100k * 25kb = 25000000kb (2.5 * 10^6)

Kilobyte: 2.5 * 10^6 = 25.000.000 (25 millions)
Megabyte: 25000000 / 1000 = 25000 (remove 3 zeros)
Gigabytes: 25000 / 1000 = 25GB (remove 3 zeros)


Per day: `25GB`
Per Month: 25GB * 20 (dias uteis) = `500GB`


## Leitura chamados (10 por pagina): 100kb

SE Ratio Read/Write eh 5:1

Per day: 25GB * 5 = `125GB`
Per Month: 500GB * 5 = `2.5TB`


TOTAL Bandwidth: `3TB Per Month` Read and Write


## Sorage per Month

20 Chamados Por Dia (100kb)

Storage Per Day: 20 * 100kb = `2.000kb (2MB) Per Day`
Storage Per Month: 2MB * 20 (dias uteis) = `40MB Per Month`
Storage Per Year: 40MB * 12 meses = `480MB Per Year ~= 500MB`
Storage in 10 Years: 500MB * 10 = `5000MB = 5GB in 10 Years`
Storage in 20 Years: 5GB * 2 = `10GB in 20 Years`
