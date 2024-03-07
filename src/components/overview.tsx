import { socialMedia } from '@/utils/social-media';
import { ChevronDoubleUpIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { SocialIcon } from 'react-social-icons';

export function OverviewCard({
	url,
}: {
	url: 'github' | 'linkedin' | 'instagram' | 'youtube';
}) {
	return (
		<div
			className={
				'w-full p-6 gap-6 flex flex-col justify-between rounded dark:bg-[#252B43] bg-[#F0F3FA]'
			}
		>
			<div className='flex justify-between items-center'>
				<p className='text-sm font-semibold'>Curtidas</p>
				<SocialIcon
					url={`https://${url}.com`}
					style={{ width: 32, height: 32 }}
				/>
			</div>

			<div className='flex justify-between items-end'>
				<p className='text-4xl font-semibold'>117</p>
				<div
					className={`flex items-center gap-1 font-bold text-xs text-[#29A88F]`}
				>
					<ChevronDoubleUpIcon className='h-4 w-4' />
					<span>29 %</span>
				</div>
			</div>
		</div>
	);
}
