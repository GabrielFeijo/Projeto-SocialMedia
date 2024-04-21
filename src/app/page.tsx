import { Card } from '@/components/card';
import { ModeToggle } from '@/components/mode-toggle';
import { OverviewCard } from '@/components/overview';
import { extractUserData } from '@/utils/extract-user-data';
import puppeteer from 'puppeteer';

const social: ('github' | 'linkedin' | 'instagram' | 'youtube')[] = [
	'github',
	'linkedin',
	'instagram',
	'youtube',
];

export default async function Home() {
	const findLinkedInUser = async () => {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();

		try {
			await page.goto('https://www.linkedin.com/in/gabriel-feijo/');

			const linkedInFollowers = await page.$$eval(
				'.profile-info-subheader .not-first-middot',
				(elements) => {
					return elements.map((element) => {
						return element.textContent;
					});
				}
			);

			return extractUserData(linkedInFollowers);
		} catch (error) {
			console.error('Error while scraping', error);
		} finally {
			await browser.close();
		}
	};

	const findGithubUser = async () => {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();

		try {
			await page.goto('https://github.com/GabrielFeijo?tab=repositories');

			const githubFollowers = await page.$$eval(
				'.js-profile-editable-area',
				(elements) => {
					return elements.map((element) => {
						return element.textContent;
					});
				}
			);

			return extractUserData(githubFollowers, 'en');
		} catch (error) {
			console.error('Error while scraping', error);
		} finally {
			await browser.close();
		}
	};

	const linkedInData = await findLinkedInUser();

	const githubData = await findGithubUser();

	return (
		<div className='p-10 space-y-7 max-w-[90rem] mx-auto'>
			<header className='flex justify-between items-center'>
				<div>
					<h1 className='text-3xl font-bold'>Social Media Dashboard</h1>
				</div>
				<ModeToggle />
			</header>

			<main className='flex flex-wrap md:flex-nowrap gap-7'>
				<Card
					url={'github'}
					name='Gabriel Feijó'
					followers={githubData?.followers}
				>
					<p>Seguindo: {githubData?.following}</p>
				</Card>
				<Card
					url={'linkedin'}
					name='Gabriel Feijó'
					followers={linkedInData?.followers}
				>
					<p>Conexões: {linkedInData?.following}</p>
				</Card>

				<Card
					url={'instagram'}
					name='Gabriel Feijó'
					privateNumber
				></Card>

				<Card
					url={'youtube'}
					name='Gabriel Feijó'
					privateNumber
				></Card>
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
