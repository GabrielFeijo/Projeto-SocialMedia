import { Card } from '@/components/card';
import { ModeToggle } from '@/components/mode-toggle';
import { OverviewCard } from '@/components/overview';
import { extractLanguageStats } from '@/utils/extract-language-stats';
import { extractGitHubStats } from '@/utils/extract-stats';
import { extractUserData } from '@/utils/extract-user-data';
import puppeteer from 'puppeteer';

const social: ('github' | 'linkedin' | 'instagram' | 'youtube')[] = [
	'github',
	'linkedin',
	'instagram',
	'youtube',
];

export default async function Home() {
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

			return extractUserData(githubFollowers);
		} catch (error) {
			console.error('Error while scraping', error);
		} finally {
			await browser.close();
		}
	};

	const findGithubStats = async () => {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();

		try {
			await page.goto(
				'https://github-readme-stats-sigma-five.vercel.app/api?username=GabrielFeijo'
			);

			const gitHubStats = await page.$$eval('.stagger', (elements) => {
				return elements.map((element) => {
					return element.textContent;
				});
			});

			await page.goto(
				'https://github-readme-stats-sigma-five.vercel.app/api/top-langs?username=GabrielFeijo'
			);

			const mostUsedLanguages = await page.$$eval('.lang-name', (elements) => {
				return elements.map((element) => {
					return element.textContent;
				});
			});

			const formatGitHubStats = extractGitHubStats(gitHubStats);
			const formatLanguageStats = extractLanguageStats(mostUsedLanguages);

			return {
				stats: formatGitHubStats,
				languages: formatLanguageStats,
			};
		} catch (error) {
			console.error('Error while scraping', error);
		} finally {
			await browser.close();
		}
	};

	const githubInfo = await findGithubUser();

	const data = await findGithubStats();

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
					followers={githubInfo?.followers}
				>
					<p>Seguindo: {githubInfo?.following}</p>
				</Card>
				<Card
					url={'linkedin'}
					name='Gabriel Feijó'
					followers={99}
				>
					<p>Conexões: 99</p>
				</Card>
				<Card
					url={'youtube'}
					name='Gabriel Feijó'
					followers={99}
				>
					<p>Seguindo: 99</p>
				</Card>

				<Card
					url={'instagram'}
					name='Gabriel Feijó'
					privateNumber
				></Card>
			</main>

			<section>
				<h2 className='text-2xl font-bold '>GitHub - Overview</h2>
				<div className='flex flex-wrap md:flex-nowrap gap-7 mt-6'>
					{data && (
						<>
							<OverviewCard
								text={'Total Stars'}
								value={data.stats.totalStars}
							/>
							<OverviewCard
								text={'Total Commits'}
								value={data.stats.totalCommits}
							/>
							<OverviewCard
								text={'Total Issues'}
								value={data.stats.totalIssues}
							/>
							<OverviewCard
								text={'Total PRs'}
								value={data.stats.totalPRs}
							/>
							<OverviewCard
								text={'Contributed to'}
								value={data.stats.contributedTo}
							/>
						</>
					)}
				</div>
			</section>
			<section>
				<h2 className='text-2xl font-bold '>GitHub - Top Languages</h2>
				<div className='flex flex-wrap md:flex-nowrap gap-7 mt-6'>
					{data?.languages.map((language) => (
						<OverviewCard
							key={language.language}
							text={language.language}
							value={language.percentage}
							showPercentage
						/>
					))}
				</div>
			</section>
		</div>
	);
}
