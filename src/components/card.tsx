import { socialMedia } from '@/utils/social-media';
import { ComponentPropsWithoutRef } from 'react';
import { SocialIcon } from 'react-social-icons';

interface ICardProps extends ComponentPropsWithoutRef<'div'> {
	url: 'github' | 'linkedin' | 'instagram' | 'youtube';
	followers?: number;
	name: string;
	privateNumber?: boolean;
}

export function Card({
	url,
	followers,
	name,
	children,
	privateNumber,
}: ICardProps) {
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
				<h2 className={`font-bold text-5xl ${privateNumber && 'blur-xl'}`}>
					{followers || 99}
				</h2>
				<p className='uppercase opacity-30 tracking-widest'>Seguidores</p>
			</div>

			<div className={`flex items-center gap-1 font-semibold`}>
				{children} {privateNumber && <span>🔒 privado</span>}
			</div>
		</div>
	);
}
