import { PostData } from './types'

export const POST_MOCK: PostData = {
  title: 'Why 5-Axis Machining Is No Longer Optional for Competitive Shops',
  titleAccent: 'No Longer Optional',
  categories: ['CNC Technology', '5-Axis', 'Manufacturing Strategy'],
  date: 'March 12, 2025',
  author: 'Dan Pletcher',
  authorTitle: 'VP, Phillips Corporation',
  readTime: '8 min read',
  sections: [
    { id: 'intro', heading: 'The Shift Is Happening', body: 'Ten years ago, 5-axis machining was the domain of aerospace primes and high-end mold shops. The machines were expensive, the programming was complex, and most job shops couldn\'t justify the investment. That era is over.\n\nToday, 5-axis machining centers from Hermle, Mazak, and Haas are more accessible, more reliable, and more productive than ever. And the shops that aren\'t adopting them are losing quotes to shops that are.' },
    { id: 'economics', heading: 'The Economics Have Changed', body: 'The price gap between 3-axis and 5-axis has narrowed dramatically. A Haas UMC-750 delivers true simultaneous 5-axis capability at a price point that would have been unthinkable a decade ago. And when you factor in setup reduction — going from 6 operations to 1 — the ROI math becomes compelling.\n\nPhillips customers routinely see 40–60% cycle time reductions within the first 6 months of 5-axis adoption. That\'s not marketing — that\'s measured production data from shops in our territory.' },
    { id: 'complexity', heading: 'Part Complexity Is Increasing', body: 'Your customers are designing more complex parts. Organic surfaces, undercuts, thin walls, compound angles — these features are standard in aerospace, medical, and even consumer products. A 3-axis machine with a rotary table can approximate 5-axis capability, but it can\'t match the surface finish, accuracy, or cycle time of true simultaneous 5-axis.\n\nThe shops winning work today are the ones that can say "yes" to complex geometry without hesitating.' },
    { id: 'action', heading: 'How to Get Started', body: 'You don\'t need to replace your entire floor. Start with one machine, one application, and one champion operator. Phillips applications engineers will help you identify the right first project — typically a part with multiple setups that can be consolidated into one.\n\nWe\'ll program it, prove it with a test cut at our Technology Center, and train your team. Most shops are running production parts within 30 days of installation.' },
  ],
  pullQuote: '"The shops winning work today are the ones that can say yes to complex geometry without hesitating."',
  relatedPosts: [
    { title: 'Hermle C 32 U: The Machine That Changed Precision Manufacturing', category: '5-Axis', date: 'Feb 2025' },
    { title: 'Setup Reduction Strategies for High-Mix Job Shops', category: 'Productivity', date: 'Jan 2025' },
    { title: 'Choosing Your First 5-Axis Machine: A Buyer\'s Guide', category: 'Buying Guide', date: 'Dec 2024' },
  ],
}
