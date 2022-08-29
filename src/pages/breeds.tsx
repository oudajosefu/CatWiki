import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import CopyrightIcon from '@mui/icons-material/Copyright';
import CatwikiLogo from '../../public/static/CatwikiLogo.svg';
import { useState } from 'react';

type Breed = {
	order: number;
	id: string;
	name: string;
	description: string;
	image: {
		id: string;
		url: string;
		width: number;
		height: number;
	};
};

const Breeds: NextPage<InferGetStaticPropsType<GetStaticProps>> = ({
	orderedData,
}) => {
	// console.log('filteredData:', filteredData);
	const [showingBreeds, setShowingBreeds] = useState<Array<Breed>>(
		orderedData.slice(0, 3)
	);
	// console.log('showingBreeds:', showingBreeds);

	return (
		<div className='flex min-h-screen'>
			<Head>
				<title>Breeds</title>
				<link rel='icon' href='/static/Cat.svg' />
			</Head>

			<main className='flex flex-col items-center flex-1 w-full px-4 md:px-10 lg:px-24 font-montserrat'>
				<header className='flex justify-start h-[5rem] w-full items-center'>
					<a href='/'>
						<CatwikiLogo className='w-32 h-11' />
					</a>
				</header>

				<section className='flex flex-col w-full gap-10 xl:px-24'>
					<h1 className='self-center text-4xl font-bold text-center md:self-start'>
						Top 10 most searched breeds
					</h1>
					<div className='grid grid-rows-3 gap-10'>
						{showingBreeds.map((breed) => (
							<ol
								key={breed.id}
								className='flex flex-col gap-10 list-inside md:flex-row'>
								<div className='flex max-w-sm self-center md:self-start md:w-1/4 xl:w-[12vw] overflow-hidden rounded-3xl aspect-square h-fit'>
									<Image
										src={breed.image.url}
										width={breed.image.width}
										height={breed.image.height}
										objectFit='cover'
									/>
								</div>
								<li className='flex-1 text-4xl font-semibold'>
									<h2 className='inline'>
										{breed.order + 1}. {breed.name}
									</h2>
									<p className='mt-6 text-lg font-medium'>
										{breed.description}
									</p>
								</li>
							</ol>
						))}
					</div>
				</section>

				<section className='flex justify-between flex-1 w-full pt-10 mt-10 border-t'>
					{showingBreeds[0].order > 0 ? (
						<button
							className='inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md justify-self-start hover:bg-gray-50'
							onClick={() =>
								setShowingBreeds((prev: Array<Breed>) =>
									orderedData.slice(
										prev[0].order - 3,
										prev[0].order
									)
								)
							}>
							Previous
						</button>
					) : (
						<div></div>
					)}
					{showingBreeds[0].order < orderedData.length - 3 && (
						<button
							className='inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md justify-self-end hover:bg-gray-50'
							onClick={() =>
								setShowingBreeds((prev) =>
									orderedData.slice(
										prev[2].order + 1,
										prev[2].order + 4
									)
								)
							}>
							Next
						</button>
					)}
				</section>

				<footer className='w-full h-[120px] bg-black rounded-t-[2.75rem] mt-6 lg:mt-16 overflow-hidden p-7 flex flex-col md:flex-row justify-between gap-4 justify-self-end'>
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

export const getStaticProps: GetStaticProps = async (context) => {
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

	const orderedData = filteredData.map((item: Object, index: number) => ({
		order: index,
		...item,
	}));

	return {
		props: { orderedData },
	};
};

export default Breeds;
