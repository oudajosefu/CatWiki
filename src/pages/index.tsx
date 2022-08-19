import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import CopyrightIcon from '@mui/icons-material/Copyright';
import CatwikiLogo from '../../public/static/CatwikiLogo.svg';
import { useRef, useState } from 'react';
import SearchDialog from '../components/SearchDialog';

const Home: NextPage = ({
	filteredData,
}: InferGetStaticPropsType<GetStaticProps>) => {
	// console.log(data.map((item: { image: { url: string } }) => item.image.url));
	// console.log(filteredData);

	const [isOpen, setIsOpen] = useState(false);
	const [query, setQuery] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<div className='min-h-screen'>
			<Head>
				<title>CatWiki</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className='flex flex-col items-center flex-1 w-full px-4'>
				<header className='flex justify-start h-[5rem] w-full items-center'>
					<CatwikiLogo className='w-32 h-11' />
				</header>

				<section className='flex flex-col w-full rounded-[3rem] overflow-hidden bg-[#E3E1DC] pb-6'>
					<div className='relative flex w-full'>
						<Image
							src='/static/HeroImagesm.png'
							width={625}
							height={270}
							objectFit='contain'
						/>
						<div className='absolute flex flex-col w-full h-full gap-2 px-8 py-4 justify-evenly'>
							<div className='flex flex-col gap-2'>
								<div className='flex'>
									<Image
										className='invert sepia-0 saturate-[11%] hue-rotate-[348deg] brightness-[102%] contrast-[105%]'
										src='/static/Catwiki.svg'
										width={51}
										height={24}
										objectFit='contain'
									/>
								</div>
								<p className='text-white text-[0.7rem] font-montserrat w-1/2'>
									Get to know more about your cat breed
								</p>
							</div>

							<label
								className='flex items-center h-[28%] w-1/2 min-h-[2.25rem] bg-white rounded-full overflow-hidden px-4 cursor-text font-montserrat text-xs'
								onClick={() => setIsOpen(true)}
								onChange={() => setIsOpen(true)}>
								<input
									className='h-full w-full placeholder:text-[#291507] placeholder:text-xs placeholder:font-montserrat outline-none'
									type='text'
									placeholder='Search'
									value={query}
									onChange={(event) =>
										setQuery(event.target.value)
									}
								/>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='w-5 h-5'
									viewBox='0 0 20 20'
									fill='currentColor'>
									<path
										fillRule='evenodd'
										d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
										clipRule='evenodd'
									/>
								</svg>
							</label>

							<SearchDialog
								catList={filteredData.map(
									(item: { name: string; id: string }) => ({
										name: item.name,
										url: `/cat/${item.id}`,
									})
								)}
								state={{ isOpen, setIsOpen, query, setQuery }}
							/>
						</div>
					</div>

					<div className='flex flex-col items-start gap-1 py-5 px-7'>
						<h1 className='font-montserrat text-[0.75rem]'>
							Most Searched Breeds
						</h1>
						<span className='w-1/6 p-0.5 bg-[#4D270C] rounded-3xl' />
						<h2 className='w-2/3 py-4 text-lg font-bold text-left font-montserrat'>
							66+ Breeds For you to discover
						</h2>
						<div className='grid grid-cols-2 grid-rows-2 gap-3'>
							{filteredData
								.filter(
									(item: { name: string }) =>
										item.name === 'Bengal' ||
										item.name === 'Norwegian Forest Cat' ||
										item.name === 'Savannah' ||
										item.name === 'Selkirk Rex'
								)
								.map(
									(item: {
										id: string;
										name: string;
										image: {
											url: string;
											width: number;
											height: number;
										};
									}) => (
										<div
											key={item.id}
											className='relative flex flex-col gap-1'>
											<a href={item.image.url}>
												<div className='flex overflow-hidden aspect-square rounded-3xl hover:opacity-50 hover:bg-black'>
													{item.name === 'Bengal' && (
														<div className='absolute bg-[#DEC68B] w-1/4 h-[60%] -left-2 rounded-2xl place-self-center'></div>
													)}
													<Image
														className=''
														src={item.image.url}
														alt={item.name}
														width={item.image.width}
														height={
															item.image.height
														}
														objectFit='cover'
														objectPosition={
															item.name ===
															'Bengal'
																? 'right'
																: 'center'
														}
													/>
												</div>
											</a>
											<h3 className='text-sm font-semibold font-montserrat'>
												{item.name}
											</h3>
										</div>
									)
								)}
						</div>
					</div>
				</section>

				<section className='flex flex-col w-full gap-4 mt-16'>
					<span className='w-1/6 p-0.5 bg-[#4D270C] rounded-3xl' />
					<h2 className='font-montserrat font-bold text-[2.5rem] w-11/12 text-left mb-8'>
						Why should you have a cat?
					</h2>
					<p className='mb-2 text-lg leading-6 font-montserrat'>
						Having a cat around you can actually trigger the release
						of calming chemicals in your body which lower your
						stress and anxiety levels
					</p>
					<a
						href=''
						className='font-montserrat font-bold text-[rgba(41,21,7,0.6)] text-xs flex gap-3 items-center'>
						READ MORE
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='w-6 h-6'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
							strokeWidth={2}>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M17 8l4 4m0 0l-4 4m4-4H3'
							/>
						</svg>
					</a>
				</section>

				<section className='flex gap-4 mt-16'>
					<div className='flex flex-col gap-4'>
						<div className='flex overflow-hidden rounded-3xl'>
							<Image
								src='/static/image 2.png'
								width={411}
								height={252}
								objectFit='cover'
							/>
						</div>
						<div className='flex self-end w-3/4 overflow-hidden rounded-3xl'>
							<Image
								src='/static/image 1.png'
								width={294}
								height={440}
								objectFit='cover'
							/>
						</div>
					</div>
					<div>
						<div className='flex overflow-hidden rounded-3xl'>
							<Image
								src='/static/image 3.png'
								width={359}
								height={580}
								objectFit='cover'
							/>
						</div>
					</div>
				</section>

				<footer className='w-full h-[120px] bg-black rounded-t-[2.75rem] mt-6 overflow-hidden p-7 flex flex-col gap-4'>
					<div className='flex w-1/4'>
						<Image
							className='invert sepia-0 saturate-[11%] hue-rotate-[348deg] brightness-[102%] contrast-[105%]'
							src='/static/CatwikiLogo.svg'
							width={128}
							height={44}
							objectFit='contain'
						/>
					</div>
					<div className='flex items-center gap-1'>
						<CopyrightIcon className='fill-white' />
						<span className='text-xs text-white font-montserrat'>
							created by{' '}
							<a href='https://devchallenges.io/portfolio/oudajosefu'>
								<u>oudajosefu</u>
							</a>{' '}
							- devChallenge.io 2021
						</span>
					</div>
				</footer>
			</main>
		</div>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const data = await fetch('https://api.thecatapi.com/v1/breeds', {
		method: 'GET',
		headers: {
			'x-api-key': process.env.CAT_API_KEY as string,
		},
	}).then((res) => res.json());

	// console.log(data);
	const filteredData = data.filter(
		(item: { image: {} }) => item.image !== undefined
	);
	// console.log(filteredData.map((item: { image: {} }) => item.image));

	return {
		props: { filteredData },
	};
};

export default Home;
