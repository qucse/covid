import React from 'react';
import { ResponsiveChoropleth } from '@nivo/geo';

export const CountriesMap = () => {
	let data = [
		{
			id: 'AFG',
			value: 120356
		},
		{
			id: 'AGO',
			value: 71222
		},
		{
			id: 'ALB',
			value: 800404
		},
		{
			id: 'ARE',
			value: 682215
		},
		{
			id: 'ARG',
			value: 691354
		},
		{
			id: 'ARM',
			value: 353750
		},
		{
			id: 'ATA',
			value: 328506
		},
		{
			id: 'ATF',
			value: 263493
		},
		{
			id: 'AUT',
			value: 296829
		},
		{
			id: 'AZE',
			value: 792765
		},
		{
			id: 'BDI',
			value: 162251
		},
		{
			id: 'BEL',
			value: 851621
		},
		{
			id: 'BEN',
			value: 222901
		},
		{
			id: 'BFA',
			value: 792639
		},
		{
			id: 'BGD',
			value: 779968
		},
		{
			id: 'BGR',
			value: 725905
		},
		{
			id: 'BHS',
			value: 985319
		},
		{
			id: 'BIH',
			value: 543583
		},
		{
			id: 'BLR',
			value: 757225
		},
		{
			id: 'BLZ',
			value: 686464
		},
		{
			id: 'BOL',
			value: 947229
		},
		{
			id: 'BRN',
			value: 121710
		},
		{
			id: 'BTN',
			value: 646725
		},
		{
			id: 'BWA',
			value: 176218
		},
		{
			id: 'CAF',
			value: 151281
		},
		{
			id: 'CAN',
			value: 268025
		},
		{
			id: 'CHE',
			value: 948707
		},
		{
			id: 'CHL',
			value: 931838
		},
		{
			id: 'CHN',
			value: 999000
		},
		{
			id: 'CIV',
			value: 696442
		},
		{
			id: 'CMR',
			value: 162070
		},
		{
			id: 'COG',
			value: 345599
		},
		{
			id: 'COL',
			value: 577565
		},
		{
			id: 'CRI',
			value: 459178
		},
		{
			id: 'CUB',
			value: 829104
		},
		{
			id: '-99',
			value: 445399
		},
		{
			id: 'CYP',
			value: 233811
		},
		{
			id: 'CZE',
			value: 74936
		},
		{
			id: 'DEU',
			value: 117664
		},
		{
			id: 'DJI',
			value: 303344
		},
		{
			id: 'DNK',
			value: 555300
		},
		{
			id: 'DOM',
			value: 270274
		},
		{
			id: 'DZA',
			value: 949101
		},
		{
			id: 'ECU',
			value: 902911
		},
		{
			id: 'EGY',
			value: 806480
		},
		{
			id: 'ERI',
			value: 909981
		},
		{
			id: 'ESP',
			value: 989707
		},
		{
			id: 'EST',
			value: 693427
		},
		{
			id: 'ETH',
			value: 73919
		},
		{
			id: 'FIN',
			value: 86240
		},
		{
			id: 'FJI',
			value: 535928
		},
		{
			id: 'FLK',
			value: 88083
		},
		{
			id: 'FRA',
			value: 866397
		},
		{
			id: 'GAB',
			value: 332736
		},
		{
			id: 'GBR',
			value: 419932
		},
		{
			id: 'GEO',
			value: 861152
		},
		{
			id: 'GHA',
			value: 740931
		},
		{
			id: 'GIN',
			value: 683069
		},
		{
			id: 'GMB',
			value: 433668
		},
		{
			id: 'GNB',
			value: 898930
		},
		{
			id: 'GNQ',
			value: 12628
		},
		{
			id: 'GRC',
			value: 682064
		},
		{
			id: 'GTM',
			value: 308953
		},
		{
			id: 'GUY',
			value: 713578
		},
		{
			id: 'HND',
			value: 170361
		},
		{
			id: 'HRV',
			value: 521438
		},
		{
			id: 'HTI',
			value: 701901
		},
		{
			id: 'HUN',
			value: 711232
		},
		{
			id: 'IDN',
			value: 575006
		},
		{
			id: 'IND',
			value: 412056
		},
		{
			id: 'IRL',
			value: 12620
		},
		{
			id: 'IRN',
			value: 916668
		},
		{
			id: 'IRQ',
			value: 535174
		},
		{
			id: 'ISL',
			value: 478468
		},
		{
			id: 'ISR',
			value: 386074
		},
		{
			id: 'ITA',
			value: 272145
		},
		{
			id: 'JAM',
			value: 947687
		},
		{
			id: 'JOR',
			value: 172446
		},
		{
			id: 'JPN',
			value: 188951
		},
		{
			id: 'KAZ',
			value: 371019
		},
		{
			id: 'KEN',
			value: 756165
		},
		{
			id: 'KGZ',
			value: 497276
		},
		{
			id: 'KHM',
			value: 594932
		},
		{
			id: 'OSA',
			value: 184915
		},
		{
			id: 'KWT',
			value: 747448
		},
		{
			id: 'LAO',
			value: 887516
		},
		{
			id: 'LBN',
			value: 757285
		},
		{
			id: 'LBR',
			value: 270556
		},
		{
			id: 'LBY',
			value: 104977
		},
		{
			id: 'LKA',
			value: 445234
		},
		{
			id: 'LSO',
			value: 712426
		},
		{
			id: 'LTU',
			value: 54257
		},
		{
			id: 'LUX',
			value: 963146
		},
		{
			id: 'LVA',
			value: 735784
		},
		{
			id: 'MAR',
			value: 202218
		},
		{
			id: 'MDA',
			value: 204620
		},
		{
			id: 'MDG',
			value: 398759
		},
		{
			id: 'MEX',
			value: 322896
		},
		{
			id: 'MKD',
			value: 740729
		},
		{
			id: 'MLI',
			value: 178106
		},
		{
			id: 'MMR',
			value: 698923
		},
		{
			id: 'MNE',
			value: 882502
		},
		{
			id: 'MNG',
			value: 396619
		},
		{
			id: 'MOZ',
			value: 625734
		},
		{
			id: 'MRT',
			value: 538110
		},
		{
			id: 'MWI',
			value: 125581
		},
		{
			id: 'MYS',
			value: 632391
		},
		{
			id: 'NAM',
			value: 553710
		},
		{
			id: 'NCL',
			value: 417325
		},
		{
			id: 'NER',
			value: 814960
		},
		{
			id: 'NGA',
			value: 732316
		},
		{
			id: 'NIC',
			value: 546652
		},
		{
			id: 'NLD',
			value: 47809
		},
		{
			id: 'NOR',
			value: 574993
		},
		{
			id: 'NPL',
			value: 29022
		},
		{
			id: 'NZL',
			value: 580489
		},
		{
			id: 'OMN',
			value: 100279
		},
		{
			id: 'PAK',
			value: 512666
		},
		{
			id: 'PAN',
			value: 33417
		},
		{
			id: 'PER',
			value: 648290
		},
		{
			id: 'PHL',
			value: 480060
		},
		{
			id: 'PNG',
			value: 346410
		},
		{
			id: 'POL',
			value: 583534
		},
		{
			id: 'PRI',
			value: 295276
		},
		{
			id: 'PRT',
			value: 688782
		},
		{
			id: 'PRY',
			value: 951720
		},
		{
			id: 'QAT',
			value: 269409
		},
		{
			id: 'ROU',
			value: 894706
		},
		{
			id: 'RUS',
			value: 449046
		},
		{
			id: 'RWA',
			value: 761993
		},
		{
			id: 'ESH',
			value: 53466
		},
		{
			id: 'SAU',
			value: 511454
		},
		{
			id: 'SDN',
			value: 780987
		},
		{
			id: 'SDS',
			value: 504523
		},
		{
			id: 'SEN',
			value: 453332
		},
		{
			id: 'SLB',
			value: 393949
		},
		{
			id: 'SLE',
			value: 662828
		},
		{
			id: 'SLV',
			value: 872798
		},
		{
			id: 'ABV',
			value: 436096
		},
		{
			id: 'SOM',
			value: 185151
		},
		{
			id: 'SRB',
			value: 25695
		},
		{
			id: 'SUR',
			value: 680313
		},
		{
			id: 'SVK',
			value: 575250
		},
		{
			id: 'SVN',
			value: 912981
		},
		{
			id: 'SWZ',
			value: 764092
		},
		{
			id: 'SYR',
			value: 555838
		},
		{
			id: 'TCD',
			value: 694162
		},
		{
			id: 'TGO',
			value: 987570
		},
		{
			id: 'THA',
			value: 949419
		},
		{
			id: 'TJK',
			value: 840341
		},
		{
			id: 'TKM',
			value: 151609
		},
		{
			id: 'TLS',
			value: 685199
		},
		{
			id: 'TTO',
			value: 17832
		},
		{
			id: 'TUN',
			value: 463242
		},
		{
			id: 'TUR',
			value: 952608
		},
		{
			id: 'TWN',
			value: 57161
		},
		{
			id: 'TZA',
			value: 502778
		},
		{
			id: 'UGA',
			value: 725538
		},
		{
			id: 'UKR',
			value: 146896
		},
		{
			id: 'URY',
			value: 335619
		},
		{
			id: 'USA',
			value: 624588
		},
		{
			id: 'UZB',
			value: 815490
		},
		{
			id: 'VEN',
			value: 536872
		},
		{
			id: 'VNM',
			value: 483143
		},
		{
			id: 'VUT',
			value: 205821
		},
		{
			id: 'PSE',
			value: 910757
		},
		{
			id: 'YEM',
			value: 683301
		},
		{
			id: 'ZAF',
			value: 862895
		},
		{
			id: 'ZMB',
			value: 58196
		},
		{
			id: 'ZWE',
			value: 922882
		},
		{
			id: 'KOR',
			value: 458980
		}
	];
	return (
		<ResponsiveChoropleth
			data={data}
			features="/* please have a look at the description for usage */"
			margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
			colors="nivo"
			domain={[ 0, 1000000 ]}
			unknownColor="#666666"
			label="properties.name"
			valueFormat=".2s"
			projectionTranslation={[ 0.5, 0.5 ]}
			projectionRotation={[ 0, 0, 0 ]}
			enableGraticule={true}
			graticuleLineColor="#dddddd"
			borderWidth={0.5}
			borderColor="#152538"
			legends={[
				{
					anchor: 'bottom-left',
					direction: 'column',
					justify: true,
					translateX: 20,
					translateY: -100,
					itemsSpacing: 0,
					itemWidth: 94,
					itemHeight: 18,
					itemDirection: 'left-to-right',
					itemTextColor: '#444444',
					itemOpacity: 0.85,
					symbolSize: 18,
					effects: [
						{
							on: 'hover',
							style: {
								itemTextColor: '#000000',
								itemOpacity: 1
							}
						}
					]
				}
			]}
		/>
	);
};
