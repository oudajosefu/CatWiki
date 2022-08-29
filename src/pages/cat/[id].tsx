import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import CatwikiLogo from '../../../public/static/CatwikiLogo.svg';
import CopyrightIcon from '@mui/icons-material/Copyright';

type CatResponse = {
	breeds: Array<{ id: string; name: string }>;
	id: string;
	url: string;
	width: number;
	height: number;
};

const Cat = ({ images }: InferGetStaticPropsType<GetStaticProps>) => {
	// console.log('images:', images);
	const coverImage = images[0];
	const otherImages = images.slice(1);
	const breedInfo = coverImage.breeds[0];
	// console.log('breedInfo:', breedInfo);
	return (
		<div className='min-h-screen'>
			<Head>
				<title>{breedInfo.name}</title>
				<link rel='icon' href='/static/Cat.svg' />
			</Head>
			<main className='flex flex-col items-center flex-1 w-full px-5 md:gap-12 md:px-16'>
				<header className='flex justify-start h-[5rem] w-full items-center'>
					<a href='/'>
						<CatwikiLogo className='w-32 h-11' />
					</a>
				</header>
				<section className='flex flex-col justify-center gap-5 xl:gap-20 xl:px-20 lg:flex-row'>
					<div className='relative flex self-center max-w-md mx-5 lg:max-w-xs lg:self-start h-fit aspect-square'>
						<div className='flex justify-start w-full overflow-hidden h-fit aspect-square rounded-3xl hover:opacity-50'>
							<div className='bg-[#DEC68B] absolute w-20 h-3/4 rounded-xl place-self-center -left-3' />
							<Image
								className='cursor-pointer'
								key={coverImage.id}
								src={coverImage.url}
								alt={coverImage.id}
								width={coverImage.width}
								height={coverImage.height}
								objectFit='cover'
								objectPosition='center'
							/>
						</div>
					</div>
					<div className='flex flex-col gap-4'>
						<h1 className='font-semibold font-montserrat text-[#291507] text-4xl'>
							{breedInfo.name}
						</h1>
						<p className='font-montserrat text-[#291507] text-lg'>
							{breedInfo.description}
						</p>
						<p className='font-montserrat text-[#291507] text-lg'>
							<span className='font-bold'>Temperament: </span>
							{breedInfo.temperament}
						</p>
						<p className='font-montserrat text-[#291507] text-lg'>
							<span className='font-bold'>Origin: </span>
							{breedInfo.origin}
						</p>
						<p className='font-montserrat text-[#291507] text-lg'>
							<span className='font-bold'>Life Span: </span>
							{breedInfo.life_span}
						</p>
						<div className='flex flex-col max-w-xl gap-4'>
							{[
								'adaptability',
								'affection_level',
								'child_friendly',
								'grooming',
								'intelligence',
								'health_issues',
								'social_needs',
								'stranger_friendly',
							].map((key) => (
								<div
									className='flex font-montserrat text-[#291507] text-lg justify-between flex-col lg:flex-row'
									key={key}>
									<p className='font-bold capitalize'>
										{key.replace(/_/g, ' ')}:
									</p>
									<div>
										{[...Array(5)].map((e, i) => (
											<div
												className={`inline-block h-[0.7rem] rounded-full w-14 md:w-16 mx-1 ${
													i < breedInfo[key]
														? 'bg-[#544439]'
														: 'bg-[#E0E0E0]'
												}`}
												key={i}
											/>
										))}
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
				<section className='flex flex-col gap-5 py-8 md:gap-8'>
					<h2 className='text-[#291507] font-montserrat font-semibold text-4xl'>
						Other photos
					</h2>
					<div className='grid grid-cols-2 gap-5 md:gap-8 md:grid-cols-4'>
						{otherImages.map((item: CatResponse) => (
							<div className='flex w-full overflow-hidden aspect-square rounded-2xl'>
								<Image
									className='cursor-pointer'
									key={item.id}
									src={item.url}
									alt={item.id}
									width={item.width}
									height={item.height}
									objectFit='cover'
									objectPosition='center'
								/>
							</div>
						))}
					</div>
				</section>
				<footer className='w-full bg-black rounded-t-[2.75rem] md:mt-6 overflow-hidden px-10 py-4 flex flex-col md:flex-row justify-between'>
					<div className='flex w-1/4'>
						<Image
							className='invert sepia-0 saturate-[0%] hue-rotate-[360deg] brightness-[100%] contrast-[200%]'
							src='/static/CatwikiLogo.svg'
							width={128}
							height={44}
							objectFit='contain'
						/>
					</div>
					<div className='flex items-center self-end gap-1'>
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

export const getStaticPaths: GetStaticPaths = async () => {
	const data = await fetch('https://api.thecatapi.com/v1/breeds', {
		method: 'GET',
		headers: {
			'x-api-key': process.env.CAT_API_KEY as string,
		},
	}).then((res) => res.json());

	const filteredData = data.filter(
		(item: { image: Object }) => item.image !== undefined
	);
	// console.log(filteredData);

	const catIdPaths = filteredData.map((item: { id: string }) => ({
		params: { id: item.id },
	}));

	return {
		paths: catIdPaths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const images = await fetch(
		`https://api.thecatapi.com/v1/images/search?breed_id=${params?.id}&limit=100&size=med`,
		{
			method: 'GET',
			headers: {
				'x-api-key': process.env.CAT_API_KEY as string,
			},
		}
	).then((res) => res.json());
	// console.log('images:', images);

	return {
		props: { images },
	};
};

export default Cat;
