import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import CopyrightIcon from '@mui/icons-material/Copyright';
import CatwikiLogo from '../../public/static/CatwikiLogo.svg';
import { useEffect, useState } from 'react';
import SearchDialog from '../components/SearchDialog';
import SearchCombo from '../components/SearchCombo';

const Home: NextPage<InferGetStaticPropsType<GetStaticProps>> = ({
	filteredData,
	breedCoverImages,
}) => {
	// console.log(data.map((item: { image: { url: string } }) => item.image.url));
	// console.log(filteredData);
	// console.log(breedCoverImages);

	const [isOpen, setIsOpen] = useState(false);
	const [query, setQuery] = useState('');
	const [isDesktop, setIsDesktop] = useState(false); // Tailwind md breakpoint

	const updateMedia = () => {
		setIsDesktop(window.innerWidth >= 768);
	};

	useEffect(() => {
		setIsDesktop(window.innerWidth >= 768);
		window.addEventListener('resize', updateMedia);
		return () => window.removeEventListener('resize', updateMedia); // Cleanup on unmount
	}, []);

	return (
		<div className='min-h-screen'>
			<Head>
				<title>CatWiki</title>
				<link rel='icon' href='/static/Cat.svg' />
			</Head>

			<main className='flex flex-col items-center flex-1 w-full px-4 md:px-10 lg:px-24'>
				<header className='flex justify-start h-[5rem] w-full items-center'>
					<a href='/'>
						<CatwikiLogo className='w-32 h-11' />
					</a>
				</header>

				<section className='flex flex-col w-full rounded-[3rem] overflow-hidden bg-[#E3E1DC] pb-6 lg:pb-0'>
					<div className='relative flex w-full'>
						<Image
							src='/static/HeroImage.png'
							width={1873}
							height={808}
							objectFit='contain'
						/>
						<div className='absolute flex flex-col w-full h-full gap-2 px-8 py-4 md:px-8 lg:px-16 lg:py-6 xl:px-24 xl:py-20 justify-evenly md:justify-start md:gap-10 lg:gap-14'>
							<div className='flex flex-col gap-2'>
								<div className='flex'>
									{isDesktop ? (
										<Image
											className='invert contrast-[150%]'
											src='/static/CatwikiLogo.svg'
											width={259}
											height={87}
											objectFit='contain'
										/>
									) : (
										<Image
											className='invert contrast-[150%]'
											src='/static/Catwiki.svg'
											width={51}
											height={24}
											objectFit='contain'
										/>
									)}
								</div>
								<p className='text-white text-[0.7rem] md:text-sm lg:text-xl font-montserrat w-1/2 md:w-1/3'>
									Get to know more about your cat breed
								</p>
							</div>

							{isDesktop ? (
								<SearchCombo
									className='flex flex-col gap-4 md:w-1/2 xl:w-[40%] md:text-sm lg:text-2xl'
									height='lg:h-20 md:h-10'
									absolute={true}
									position='lg:w-1/2 xl:w-[40%] md:w-1/2 md:mt-12 lg:mt-24 z-10 xl:max-h-[50%] md:max-h-[70%] lg:p-4 md:p-2'
									catList={filteredData.map(
										(item: {
											name: string;
											id: string;
										}) => ({
											name: item.name,
											url: `/cat/${item.id}`,
										})
									)}
									query={query}
									setQuery={setQuery}
									staticMode={false}
									placeholder='Enter your breed'
								/>
							) : (
								<label className='flex items-center h-[28%] w-1/2 min-h-[2.25rem] bg-white rounded-full overflow-hidden px-4 cursor-text font-montserrat text-xs'>
									<input
										className='h-full w-full placeholder:text-[#291507] placeholder:text-xs placeholder:font-montserrat outline-none'
										type='text'
										placeholder='Search'
										value={query}
										onChange={(event) => {
											setQuery(event.target.value);
											event.target.value
												? setIsOpen(true)
												: setIsOpen(false);
										}}
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
							)}

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

					<div className='flex flex-col items-start gap-1 py-5 px-7 lg:px-16 lg:py-12 xl:px-24 xl:gap-4 xl:py-20'>
						<h1 className='font-montserrat text-[0.75rem] xl:text-lg'>
							Most Searched Breeds
						</h1>
						<span className='w-1/6 p-0.5 bg-[#4D270C] rounded-3xl' />
						<div className='flex justify-between w-full'>
							<h2 className='w-2/3 py-4 text-lg font-bold text-left xl:text-5xl font-montserrat'>
								{filteredData.length}+ Breeds For you to
								discover
							</h2>
							<a
								href='/breeds'
								className='font-montserrat font-bold text-[rgba(41,21,7,0.6)] text-xs xl:text-lg flex h-4 gap-1 md:gap-3 items-center self-center xl:self-end xl:mb-6'>
								SEE MORE
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
						</div>
						<div className='grid grid-cols-2 gap-3 lg:grid-cols-4 md:gap-8 xl:gap-12'>
							{breedCoverImages.map(
								(item: {
									id: string;
									url: string;
									breeds: Array<{
										id: string;
										name: string;
									}>;
									width: number;
									height: number;
								}) => (
									<div
										key={item.id}
										className='flex flex-col gap-1 lg:gap-4'>
										<a
											href={`/cat/${item.breeds[0].id}`}
											className='relative'>
											<div className='flex overflow-hidden aspect-square rounded-3xl lg:rounded-2xl hover:opacity-50 hover:bg-black'>
												{item.breeds[0].name ===
													'Bengal' && (
													<div className='absolute bg-[#DEC68B] w-1/4 h-[60%] lg:h-4/5 -left-2 xl:-left-3 rounded-2xl place-self-center' />
												)}
												<Image
													src={item.url}
													alt={item.breeds[0].name}
													width={item.width}
													height={item.height}
													objectFit='cover'
													objectPosition='center'
												/>
											</div>
										</a>
										<h3 className='text-sm font-semibold xl:text-lg font-montserrat'>
											{item.breeds[0].name}
										</h3>
									</div>
								)
							)}
						</div>
					</div>
				</section>

				<section className='flex flex-col lg:flex-row xl:px-24 lg:gap-8'>
					<div className='flex flex-col w-full gap-4 mt-16 lg:self-center lg:w-3/4'>
						<span className='w-1/6 p-0.5 bg-[#4D270C] rounded-3xl' />
						<h2 className='font-montserrat font-bold text-[2.5rem] xl:text-5xl w-11/12 text-left mb-8'>
							Why should you have a cat?
						</h2>
						<p className='mb-2 text-lg leading-6 font-montserrat'>
							Having a cat around you can actually trigger the
							release of calming chemicals in your body which
							lower your stress and anxiety levels
						</p>
						<a
							href='/breeds'
							className='font-montserrat font-bold text-[rgba(41,21,7,0.6)] text-xs lg:text-lg flex gap-3 items-center'>
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
					</div>

					<div className='flex self-center gap-4 mt-16'>
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
					</div>
				</section>

				<footer className='w-full h-[120px] bg-black rounded-t-[2.75rem] mt-6 lg:mt-16 overflow-hidden p-7 flex flex-col md:flex-row justify-between gap-4'>
					<div className='flex w-1/4'>
						<Image
							className='invert contrast-[150%]'
							src='/static/CatwikiLogo.svg'
							width={128}
							height={44}
							objectFit='contain'
						/>
					</div>
					<div className='flex items-center self-end gap-1 text-xs lg:text-lg md:self-center'>
						<CopyrightIcon className='fill-white' />
						<span className='text-white font-montserrat'>
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
		(item: { image: Object }) => item.image !== undefined
	);
	// console.log(filteredData.map((item: { image: {} }) => item.image));

	const breedCoverImages = await Promise.all(
		['ZocD-pQxd', 'G_2zGI5Wu', '-ZBBqoWNQ', 'B2YB13Ydq'].map((id: string) =>
			fetch(`https://api.thecatapi.com/v1/images/${id}`, {
				method: 'GET',
				headers: {
					'x-api-key': process.env.CAT_API_KEY as string,
				},
			}).then((res) => res.json())
		)
	);

	// console.log(breedCoverImages);

	return {
		props: { filteredData, breedCoverImages },
	};
};

export default Home;
