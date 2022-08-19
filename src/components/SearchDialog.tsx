import { Dialog, Combobox } from '@headlessui/react';
import { ChangeEvent, FC, useRef } from 'react';

interface Props {
	catList: {
		name: string;
		url: string;
	}[];
	state: {
		isOpen: boolean;
		setIsOpen: (isOpen: boolean) => void;
		query: string;
		setQuery: (query: string) => void;
	};
}

const SearchDialog: FC<Props> = (props) => {
	console.log(props.state.query);
	const inputRef = useRef<HTMLInputElement>(null);

	const filteredCats =
		props.state.query === ''
			? props.catList
			: props.catList.filter((catObject) =>
					catObject.name
						.toLowerCase()
						.replace(/\s/g, '')
						.includes(
							props.state.query?.toLowerCase().replace(/\s/g, '')
						)
			  );

	return (
		<Dialog
			initialFocus={inputRef}
			open={props.state.isOpen}
			onClose={() => props.state.setIsOpen(false)}
			className='fixed inset-0 bg-black/30'>
			<Dialog.Panel className='flex flex-col w-full px-5 py-2 space-y-8 bg-white rounded-2xl h-1/2'>
				<div className='flex justify-end'>
					<button
						className='flex rounded-xl hover:bg-[#F5F5F5] p-3 outline-none'
						onClick={() => props.state.setIsOpen(false)}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='items-end w-6 h-6'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
							strokeWidth={2}>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M6 18L18 6M6 6l12 12'
							/>
						</svg>
					</button>
				</div>
				<Combobox
					value={props.state.query}
					onChange={() => {}}
					as='div'
					className='flex flex-col flex-grow gap-4 overflow-auto'>
					<Combobox.Label className='flex w-full px-5 py-3 border-2 border-black rounded-full font-montserrat'>
						<Combobox.Input
							className='flex-grow text-lg outline-none'
							placeholder='Search'
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								props.state.setQuery(event.target.value)
							}
							ref={inputRef}
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
					<Combobox.Options static className='overflow-auto'>
						{filteredCats.map((catObject) => (
							<a href={catObject.url}>
								<Combobox.Option
									key={catObject.name}
									value={catObject.name}
									className={({ active }) =>
										`cursor-pointer select-none py-4 px-2 font-montserrat rounded-2xl ${
											active
												? 'bg-[#F5F5F5]'
												: 'text-gray-900'
										}`
									}>
									{catObject.name}
								</Combobox.Option>
							</a>
						))}
					</Combobox.Options>
				</Combobox>
			</Dialog.Panel>
		</Dialog>
	);
};

export default SearchDialog;
