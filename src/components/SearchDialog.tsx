import { Dialog } from '@headlessui/react';
import { FC, useRef } from 'react';
import SearchCombo from './SearchCombo';

type Props = {
	catList: Array<{
		name: string;
		url: string;
	}>;
	state: {
		isOpen: boolean;
		setIsOpen: (isOpen: boolean) => void;
		query: string;
		setQuery: (query: string) => void;
	};
};

const SearchDialog: FC<Props> = (props) => {
	// console.log(props.state.query);
	const inputRef = useRef<HTMLInputElement>(null);

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
				<SearchCombo
					className='flex flex-col flex-grow gap-4 text-lg'
					catList={props.catList}
					query={props.state.query}
					setQuery={props.state.setQuery}
					staticMode={true}
					inputRef={inputRef}
					placeholder='Search'
				/>
			</Dialog.Panel>
		</Dialog>
	);
};

export default SearchDialog;
