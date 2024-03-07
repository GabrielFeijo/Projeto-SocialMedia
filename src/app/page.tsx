import { Card } from '@/components/card';
import { ModeToggle } from '@/components/mode-toggle';
import { OverviewCard } from '@/components/overview';

const social: ('github' | 'linkedin' | 'instagram' | 'youtube')[] = [
	'github',
	'linkedin',
	'instagram',
	'youtube',
];

export default function Home() {
	return (
		<div className='p-10 space-y-7 max-w-[90rem] mx-auto'>
			<header className='flex justify-between items-center'>
				<div>
					<h1 className='text-3xl font-bold'>Social Media Dashboard</h1>
					<p className='text-sm font-semibold text-primary opacity-70'>
						Total Followers: 23,004
					</p>
				</div>
				<ModeToggle />
			</header>

			<main className='flex flex-wrap md:flex-nowrap gap-7'>
				{social.map((url) => (
					<Card
						key={url}
						url={url}
						name='Gabriel Feijó'
					/>
				))}
			</main>

			<section>
				<h2 className='text-2xl font-bold '>Overview - Today</h2>
				<div className='flex flex-wrap md:flex-nowrap gap-7 mt-6'>
					{social.map((url) => (
						<OverviewCard
							key={url}
							url={url}
						/>
					))}
				</div>
			</section>
		</div>
	);
}
