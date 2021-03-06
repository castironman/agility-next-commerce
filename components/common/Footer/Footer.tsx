import React, { FC } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { Page } from '@commerce/types/page'
import getSlug from '@lib/get-slug'
import { Github, Vercel, Agility } from '@components/icons'
import { Logo, Container } from '@components/ui'
import { I18nWidget } from '@components/common'
import s from './Footer.module.css'

interface Props {
	className?: string
	children?: any
	pages?: Page[],
	agilityProps: any
}

const links:[] = []

const Footer: FC<Props> = ({ className, pages, agilityProps }) => {
	const { sitePages } = usePages(pages)
	const rootClassName = cn(s.root, className)

	const siteData = agilityProps?.globalData["sitedata"] || null

	const agilityLinks = siteData?.links || []

	return (
		<footer className={rootClassName}>
			<Container>
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-accent-2 py-12 text-primary bg-primary transition-colors duration-150">
					<div className="col-span-1 lg:col-span-2">
						{ siteData &&
							<Link href="/">
								<a className="flex flex-initial items-center font-bold md:mr-24 ">
									<img src={siteData.logo.url} height="32" width="32" className="rounded-full border border-accent-6 mr-2" />
									<span>{siteData.name}</span>
								</a>
							</Link>
						}
					</div>
					<div className="col-span-1 lg:col-span-8">
						<div className="grid md:grid-rows-4 md:grid-cols-3 md:grid-flow-col">
							{[...links, ...sitePages, ...agilityLinks].map((page) => (
								<span key={page.url} className="py-3 md:py-0 md:pb-4">
									<Link href={page.url!}>
										<a className="text-accent-9 hover:text-accent-6 transition ease-in-out duration-150">
											{page.name}
										</a>
									</Link>
								</span>
							))}
						</div>
					</div>
					<div className="col-span-1 lg:col-span-2 flex items-start lg:justify-end text-primary">
						<div className="flex space-x-6 items-center h-10">
							<a
								className={s.link}
								aria-label="Github Repository"
								href="https://github.com/agility/nextsj-commerce-agilitycms"
							>
								<Github />
							</a>
							<I18nWidget />
						</div>
					</div>
				</div>
				<div className="pt-6 pb-10 flex flex-col md:flex-row justify-between items-center space-y-4 text-accent-6 text-sm">
					<div>
						<span>&copy; 2021 ACME, Inc. All rights reserved.</span>
					</div>
					<div className="flex items-center text-primary text-sm">
						<span className="text-primary">Created by</span>
						<a
							rel="noopener"
							href="https://vercel.com"
							aria-label="Vercel.com Link"
							target="_blank"
							className="text-primary"
						>
							<Vercel
								className="inline-block h-6 ml-3 text-primary"
								alt="Vercel.com Logo"
							/>
						</a>

						<span className="text-primary ml-5">CMS Integration by</span>
						<a
							rel="noopener"
							href="https://agilitycms.com"
							aria-label="AgilityCMS.com Link"
							target="_blank"
							className="text-primary"
						>
							<Agility
								className="inline-block h-6 ml-3 text-primary"
								alt="AgilityCMS.com Logo"
							/>
						</a>
					</div>
				</div>
			</Container>
		</footer>
	)
}

function usePages(pages?: Page[]) {
	const { locale } = useRouter()
	const sitePages: Page[] = []

	if (pages) {
		pages.forEach((page) => {
			const slug = page.url && getSlug(page.url)
			if (!slug) return
			if (locale && !slug.startsWith(`${locale}/`)) return
			sitePages.push(page)
		})
	}

	return {
		sitePages: sitePages.sort(bySortOrder),
	}
}

// Sort pages by the sort order assigned in the BC dashboard
function bySortOrder(a: Page, b: Page) {
	return (a.sort_order ?? 0) - (b.sort_order ?? 0)
}

export default Footer
