import { Label } from "@/components/ui/label";

import { filterOpt } from "../interface/interface";

interface filterProps {
    brandsList: string[],
    originsList: string[],
    filters: filterOpt,
    updateFilters: (option : string, value : any) => void,
    resetFilters: () => void,
    applyFilters: (type : string) => void,
    toggleFilter: () => void
}

const FilterCard : React.FC<filterProps> = ({ brandsList, originsList, filters, updateFilters, resetFilters, applyFilters, toggleFilter }) => {

    return (
        <div className='filters sticky top-4 left-0 flex flex-col order-none shadow rounded text-white bg-violet-500 max-w-full max-h-fit'>
          <div className='flex flex-row justify-between p-3'>
            <span className='underline cursor-pointer hover:no-underline hover:text-indigo-700'
            onClick={() => resetFilters()}>
              Reset Filters
            </span>
            <span className='filter_close hidden cursor-pointer hover:text-indigo-700'
            onClick={() => toggleFilter()}>
              &#10005;
            </span>
          </div>
          <div className='availability block my-4'>
            <div className='block px-3 pb-6 border-b border-solid border-white'>
              <span className='block font-bold mb-2'>Availability:</span>
              <div className=''>
                <div className='stock flex gap-2'>
                  <input type='checkbox' name='stock' checked={filters.in_stock} onChange={() => updateFilters('stock', null)} />
                  <Label htmlFor='stock'>In stock only</Label>
                </div>
              </div>
            </div>
          </div>
          <div className='brand block my-4'>
            <div className='block px-3 pb-6 border-b border-solid border-white'>
              <span className='block font-bold mb-2'>Brand:</span>
              <div className=''>
                <div className='brand flex gap-2'>
                <select className='relative z-[0] whitespace-nowrap text-violet-500 border-violet-500 border-e px-2 bg-white w-[160px] h-full cursor-pointer' 
                value={filters.brand} onChange={(event) => updateFilters('brand', event.target.value)}>
                    <option value={'All'}>All</option>
                    {brandsList.map((brand) => (
                        <option key={'option_' + brand} value={brand}>
                            {brand}
                        </option>
                    ))}
                </select>
                </div>
              </div>
            </div>
          </div>
          <div className='origin block my-4'>
            <div className='block px-3 pb-6 border-b border-solid border-white'>
              <span className='block font-bold mb-2'>Origin:</span>
              <div className=''>
                <div className='origin flex gap-2'>
                <select className='relative z-[0] whitespace-nowrap text-violet-500 border-violet-500 border-e px-2 bg-white w-[160px] h-full cursor-pointer' 
                value={filters.origin} onChange={(event) => updateFilters('origin', event.target.value)}>
                    <option value={'All'}>All</option>
                    {originsList.map((origin) => (
                        <option key={'option_' + origin} value={origin}>
                            {origin}
                        </option>
                    ))}
                </select>
                </div>
              </div>
            </div>
          </div>
          <div className='price block my-4'>
            <div className='block px-3 pb-6 border-b border-solid border-white'>
              <span className='block font-bold mb-2'>Price:</span>
              <div className=''>
                <div className='price flex gap-2'>
                  <div className='flex flex-col gap-2'>
                    <Label htmlFor='min_price'>Min</Label>
                    <input className='max-w-[100px] text-violet-500 px-2'
                    type='number' name='min_price' 
                    onChange={(event) => updateFilters('min_price', parseInt(event.target.value))} 
                    value={filters.minPrice} min={0} max={9999} />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <Label htmlFor='max_price'>Max</Label>
                    <input className='max-w-[100px] text-violet-500 px-2'
                    type='number' name='max_price' 
                    onChange={(event) => updateFilters('max_price', parseInt(event.target.value))} 
                    value={filters.maxPrice} min={0} max={9999} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className='text-violet-500 bg-white rounded m-3 p-2'
          onClick={() => {applyFilters('display');}}>
            Apply
          </button>
        </div>
    )
};

export default FilterCard;