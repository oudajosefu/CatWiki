import { Combobox } from '@headlessui/react';
import { ChangeEvent, FC } from 'react';

type Props = {
	className: string;
	query: string;
	setQuery: (query: string) => void;
	catList: Array<{
		name: string;
		url: string;
	}>;
	staticMode: boolean;
	placeholder: string;
	inputRef?: React.Ref<HTMLInputElement>;
	height?: string;
	absolute?: boolean;
	position?: string;
};

const SearchCombo: FC<Props> = ({
	className,
	query,
	setQuery,
	catList,
	staticMode,
	placeholder,
	inputRef,
	height,
	absolute,
	position,
}) => {
	const filteredCats =
		query === ''
			? catList
			: catList.filter((catObject) =>
					catObject.name
						.toLowerCase()
						.replace(/\s/g, '')
						.includes(query?.toLowerCase().replace(/\s/g, ''))
			  );

	return (
		<Combobox
			value={query}
			onChange={() => {}}
			as='div'
			className={`overflow-auto ${className}`}>
			<Combobox.Label
				className={`flex w-full px-5 py-3 overflow-visible bg-white border-2 border-black rounded-full font-montserrat items-center ${height}`}>
				<Combobox.Input
					className='flex-1 outline-none'
					{...(inputRef ? { ref: inputRef } : {})}
					placeholder={placeholder}
					onChange={(event: ChangeEvent<HTMLInputElement>) =>
						setQuery(event.target.value)
					}
				/>
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
						d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
					/>
				</svg>
			</Combobox.Label>
			<Combobox.Options
				static={staticMode}
				className={`overflow-auto bg-white rounded-3xl ${
					absolute && `absolute ${position}`
				}`}>
				{filteredCats.map((catObject) => (
					<a href={catObject.url} key={catObject.name}>
						<Combobox.Option
							value={catObject.name}
							className={({ active }) =>
								`cursor-pointer select-none py-4 px-2 font-montserrat rounded-2xl text-gray-900 ${
									active && 'bg-[#F5F5F5]'
								}`
							}>
							{catObject.name}
						</Combobox.Option>
					</a>
				))}
			</Combobox.Options>
		</Combobox>
	);
};

export default SearchCombo;
