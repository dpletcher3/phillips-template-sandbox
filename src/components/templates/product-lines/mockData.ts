import { ProductLinesData } from './types'

export const PRODUCT_LINES_MOCK: ProductLinesData = {
  brandName: 'Haas Automation',
  series: [
    {
      name: 'VF Series',
      tagline: 'The workhorse of American manufacturing',
      description: 'The Haas VF Series is the most popular CNC vertical machining center in the world. Built in Oxnard, California, every VF machine delivers reliable cutting performance, simple operation, and the lowest cost of ownership in the industry. From first-operation job shops to high-volume production floors, the VF is where it starts.',
      models: [
        { name: 'VF-1', travel: '508 × 406 × 508 mm', spindle: '8,100 RPM' },
        { name: 'VF-2', travel: '762 × 406 × 508 mm', spindle: '8,100 RPM' },
        { name: 'VF-3', travel: '1016 × 508 × 635 mm', spindle: '8,100 RPM' },
        { name: 'VF-4', travel: '1270 × 508 × 635 mm', spindle: '8,100 RPM' },
        { name: 'VF-5', travel: '1270 × 660 × 635 mm', spindle: '8,100 RPM' },
      ],
      type: 'Vertical Mill',
      xTravel: '508–1270 mm',
      spindleSpeed: '8,100 RPM',
      tableLoad: '1,588 kg',
      bestFor: 'General purpose milling',
    },
    {
      name: 'ST Series',
      tagline: 'Turning, redefined for production',
      description: 'The Haas ST Series turning centers combine heavy-duty construction with high-performance turning capability. A45° bed casting, A2-6 spindle nose, and full C-axis option make the ST line ideal for production turning, second-operation work, and complex contour machining.',
      models: [
        { name: 'ST-10', travel: '406 × 356 mm', spindle: '6,000 RPM' },
        { name: 'ST-20', travel: '533 × 406 mm', spindle: '4,000 RPM' },
        { name: 'ST-30', travel: '660 × 584 mm', spindle: '3,400 RPM' },
        { name: 'ST-35', travel: '660 × 660 mm', spindle: '2,400 RPM' },
      ],
      type: 'Turning Center',
      xTravel: '406–660 mm',
      spindleSpeed: '6,000 RPM',
      tableLoad: '454 kg',
      bestFor: 'Production turning',
    },
    {
      name: 'UMC Series',
      tagline: 'Five-axis. Haas value.',
      description: 'The Haas UMC Series brings true 5-axis simultaneous machining to shops that never thought they could afford it. A built-in trunnion table with ±120° of tilt delivers full 3+2 and simultaneous 5-axis capability — with the same Haas simplicity, reliability, and support.',
      models: [
        { name: 'UMC-500', travel: '508 × 406 × 394 mm', spindle: '8,100 RPM' },
        { name: 'UMC-750', travel: '762 × 508 × 508 mm', spindle: '8,100 RPM' },
        { name: 'UMC-1000', travel: '1016 × 635 × 635 mm', spindle: '8,100 RPM' },
      ],
      keySpecs: [
        { value: '±120°', label: 'Tilt Range' },
        { value: '5', label: 'Simultaneous Axes' },
        { value: '40+1', label: 'Tool Capacity' },
      ],
      type: '5-Axis Mill',
      xTravel: '508–1016 mm',
      spindleSpeed: '8,100 RPM',
      tableLoad: '408 kg',
      bestFor: '5-axis complex parts',
    },
  ],
}
