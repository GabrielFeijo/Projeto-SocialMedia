import { socialMedia } from '@/utils/social-media';
import { ChevronDoubleUpIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { SocialIcon } from 'react-social-icons';

export function Card({
	url,
	name,
}: {
	url: 'github' | 'linkedin' | 'instagram' | 'youtube';
	name: string;
}) {
	return (
		<div
			className={
				'w-full py-8 flex items-center flex-col gap-5 rounded dark:bg-[#252B43] bg-[#F0F3FA] border-t-4 '
			}
			style={{ borderColor: socialMedia[url].color }}
		>
			<div className='flex items-center gap-2'>
				<SocialIcon
					url={`https://${url}.com`}
					style={{ width: 24, height: 24 }}
				/>
				<p className='text-xs font-semibold'>@{name}</p>
			</div>

			<div className='text-center'>
				<h2 className='font-bold text-5xl'>1987</h2>
				<p className='uppercase opacity-30 tracking-widest'>Seguidores</p>
			</div>

			<div
				className={`flex items-center gap-1 font-semibold text-sm text-[#29A88F]`}
			>
				<ChevronDoubleUpIcon className='h-5 w-5' />
				<span>29 Hoje</span>
			</div>
		</div>
	);
}
