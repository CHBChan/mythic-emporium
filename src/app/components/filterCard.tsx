import { Label } from "@/components/ui/label";

import { filterOpt } from "../interface/interface";
import { brands, origins } from "../data/data";

interface filterProps {
    filters: filterOpt,
    updateFilters: (option : string, value : any) => void,
    resetFilters: () => void,
    applyFilters: () => void
}

const FilterCard : React.FC<filterProps> = ({ filters, updateFilters, resetFilters, applyFilters }) => {

    return (
        <div className='filters block order-none shadow rounded text-white bg-violet-500 max-w-fit'>
          <div className='p-3'>
            <span className='underline cursor-pointer hover:no-underline hover:text-indigo-700'
            onClick={() => resetFilters()}>
              Reset Filters
            </span>
          </div>
          <div className='availability block'>
            <div className='block p-3 border-b border-solid border-white'>
              <span className='block font-bold mb-2'>Availability:</span>
              <div className='filters'>
                <div className='stock flex gap-2'>
                  <input type='checkbox' name='stock' checked={filters.in_stock} onChange={() => updateFilters('stock', null)} />
                  <Label htmlFor='stock'>In stock</Label>
                </div>
              </div>
            </div>
          </div>
          <div className='brand block'>
            <div className='block p-3 border-b border-solid border-white'>
              <span className='block font-bold mb-2'>Brand:</span>
              <div className='filters'>
                <div className='brand flex gap-2'>
                <select className='relative z-[0] whitespace-nowrap text-violet-500 border-violet-500 border-e px-2 bg-white w-[64] h-full cursor-pointer' 
                value={filters.brand} onChange={(event) => updateFilters('brand', event.target.value)}>
                    {brands.map((brand) => (
                        <option key={'option_' + brand} value={brand}>
                            {brand}
                        </option>
                    ))}
                </select>
                </div>
              </div>
            </div>
          </div>
          <div className='origin block'>
            <div className='block p-3 border-b border-solid border-white'>
              <span className='block font-bold mb-2'>Origin:</span>
              <div className='filters'>
                <div className='origin flex gap-2'>
                <select className='relative z-[0] whitespace-nowrap text-violet-500 border-violet-500 border-e px-2 bg-white w-[64] h-full cursor-pointer' 
                value={filters.origin} onChange={(event) => updateFilters('origin', event.target.value)}>
                    {origins.map((origin) => (
                        <option key={'option_' + origin} value={origin}>
                            {origin}
                        </option>
                    ))}
                </select>
                </div>
              </div>
            </div>
          </div>
          <div className='price block'>
            <div className='block p-3 border-b border-solid border-white'>
              <span className='block font-bold mb-2'>Price:</span>
              <div className='filters'>
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
          <button className='text-violet-500 bg-white rounded m-2 p-2'
          onClick={() => {applyFilters(); console.log(filters)}}>
            Apply
          </button>
        </div>
    )
};

export default FilterCard;