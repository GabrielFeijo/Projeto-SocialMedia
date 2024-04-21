import { SocialIcon } from 'react-social-icons';

export function OverviewCard({
	text,
	value,
	showPercentage = false,
}: {
	text: string;
	value: number;
	showPercentage?: boolean;
}) {
	return (
		<div
			className={
				'w-full p-6 gap-6 flex flex-col justify-between rounded dark:bg-[#252B43] bg-[#F0F3FA] border-t border-[#6A6AF0]'
			}
		>
			<div className='flex justify-between items-center'>
				<p className='text-sm font-semibold'>{text}</p>
				<SocialIcon
					url={`https://github.com`}
					style={{ width: 32, height: 32 }}
				/>
			</div>

			<div className='flex justify-between items-end'>
				<p className='text-4xl font-semibold'>
					{showPercentage ? `${parseInt(value + '')}%` : value}
				</p>
			</div>
		</div>
	);
}
