import { useState, useEffect } from 'react';
import useTestData from '../../hooks/useTestData';
import { KFTeaDrink } from '@backend/types/kf';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { toppings } from '@backend/db/data/kungfu/order-options';
import { getRandomToppings } from '@backend/controller/logic';
import SkeletonLoader from './SkeletonLoader'; // Import the skeleton loader

interface CustomKFTea extends KFTeaDrink {
    id: number;
}

export default function TestIndex() {
    const [filter, setFilter] = useState<string>('');
    const [numberOfQuestions, setNumberOfQuestions] = useState<number>(10);
    const [isShuffled, setIsShuffled] = useState<boolean>(true); // Although this is not used, it still triggers the re-render and sorting of the recipes as if the isShuffledRequest is true
    const [isShuffledRequest, setIsShuffledRequest] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [newTestTrigger, setNewTestTrigger] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    // Use for trigger the UseEffect 
    const handleNewTest = () => {
        setNewTestTrigger(prev => prev + 1);
        setLoading(true);
    };

    const {
        updateSearch,
        recipes,
    }: {
        updateSearch: Function;
        recipes: CustomKFTea[];
    } = useTestData({
        recipesCount: numberOfQuestions,
        requestShuffle: isShuffledRequest,
        resetOriginalOrder: isShuffled,
    });

    // Loading effect for New Test button, changing page, and searching the items
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000); 
    }, [newTestTrigger, currentPage, filter]);

    const totalPages = Math.ceil(recipes.length / 10); // Pagination set to 10 by default

    const goToPage = (page: number) => {
        setCurrentPage(page);
        setLoading(true);
    };

    const startIndex = (currentPage - 1) * 10; // Pagination set to 10 by default
    const currentItems: any[] = recipes.slice(startIndex, startIndex + 10); // Pagination set to 10 by default

    return (
        <div className='flex items-start w-full dark:bg-gray-300 min-h-screen'>
            <div className='flex flex-col items-center w-full pb-8'>
                <div className='z-20 fixed md:flex top-0 left-0 w-screen'>
                    <div className='bg-white dark:bg-gray-400 flex flex-col lg:flex-row lg:items-center gap-3 p-3 leading-none shadow-lg w-full'>
                        <div className='flex w-full justify-center items-center'>
                            <div
                                className='cursor-pointer -translate-x-2 flex items-center justify-center w-10 h-10 bg-gray-200 dark:bg-gray-900 dark:text-gray-50'
                                onClick={() => {
                                    window.history.back();
                                }}
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='w-6 h-6'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M15.75 19.5 8.25 12l7.5-7.5'
                                    />
                                </svg>
                            </div>
                            <div className='relative items-center w-full pl-0 overflow-hidden'>
                                <svg
                                    className='w-6 h-6 text-gray-400 dark:text-white absolute top-0 left-2 translate-y-[40%] lg:translate-y-[23%] z-10'
                                    aria-hidden='true'
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='24'
                                    height='24'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                >
                                    <path
                                        stroke='currentColor'
                                        strokeLinecap='round'
                                        strokeWidth='2'
                                        d='m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z'
                                    />
                                </svg>

                                <div
                                    className={
                                        'absolute cursor-pointer transition-all ease-in-out duration-500 top-0 right-3.5 translate-y-3/4 lg:translate-y-1/2 text-gray-400' +
                                        (filter.length > 0
                                            ? ' translate-x-0 opacity-100'
                                            : ' translate-x-24 opacity-0')
                                    }
                                    onClick={() => {
                                        setFilter('');
                                        updateSearch('');
                                        setLoading(true);
                                    }}
                                >
                                    Clear
                                </div>
                                <input
                                    type='text'
                                    className='bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 lg:pr-2.5 lg:py-1.5 pl-9 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    placeholder='Search for recipes'
                                    value={filter}
                                    onChange={(e) => {
                                        e.preventDefault();
                                        if (currentPage !== 1) {
                                            setCurrentPage((curr: number) => 1);
                                        }
                                        setFilter((prev: any) => e.target.value);
                                        updateSearch(e.target.value);
                                        setLoading(true);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-full flex flex-col gap-3 md:gap-4 px-5 md:px-10 pt-[6em] lg:pt-20 pb-6'>
                    <div className='flex flex-row items-center justify-end gap-x-3'>
                        <div
                            className='bg-indigo-500 rounded text-white focus:bg-indigo-600 p-1 px-3'
                            onClick={() => {
                                if (currentPage !== 1) {
                                    setCurrentPage((curr: number) => 1);
                                }
                                setIsShuffled((prev: any) => !prev);
                                setIsShuffledRequest((prev: any) => true);
                                handleNewTest();
                                setLoading(true);
                            }}
                            role='button'
                        >
                            {'New Test'}
                        </div>
                        <select
                            disabled={loading}
                            onChange={(e) => {
                                if (currentPage !== 1) {
                                    setCurrentPage((curr: number) => 1);
                                }
                                setNumberOfQuestions(parseInt(e.target.value));
                                setLoading(true);
                                handleNewTest();
                            }}
                            className='bg-gray-50 ring-1 ring-black/20 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        >
                            {numberOfQuestions &&
                                [10, 25, 50, 100].includes(numberOfQuestions) &&
                                [10, 25, 50, 100].map((value: number, index: number) => (
                                    <option
                                        key={index}
                                        value={value}
                                    >{`Get ${value} recipes`}</option>
                                ))}
                        </select>
                    </div>
                    {loading ? (
                        // 5 box of skeleton display
                        <div className='flex flex-col items-center gap-y-2 lg:gap-y-4 w-full'>
                            {Array(5).fill(0).map((_, index) => (
                                <SkeletonLoader key={index} width="100%" height="150px" />
                            ))}
                        </div>
                    ) : (
                        <>
                            {currentItems && totalPages > 1 && currentItems.length > 2 && (
                                <div className='w-full justify-center flex flex-row items-center gap-x-3 md:gap-x-5'>
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <button
                                            key={index + 1}
                                            className={`${currentPage === index + 1
                                                ? 'bg-blue-400 dark:bg-gray-800 text-white dark:font-semibold'
                                                : 'bg-white dark:bg-gray-200 text-gray-400 dark:text-gray-400'
                                                } border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                            onClick={() => goToPage(index + 1)}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                </div>
                            )}
                            <div className='flex flex-col items-center gap-y-2 lg:gap-y-4'>
                                {currentItems &&
                                    currentItems.map((answer: KFTeaDrink, index: number) => (
                                        <div key={index}>
                                            <AnswerDisplay answer={answer} newTestTrigger={newTestTrigger} loading={loading} />
                                        </div>
                                    ))}
                            </div>
                        </>
                    )}
                </div>
                {currentItems && currentItems.length > 0 && totalPages > 1 && (
                    <div className='p-2 flex flex-row items-center gap-3 md:gap-5'>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                className={`${currentPage === index + 1
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white text-black'
                                    } border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                onClick={() => {
                                    goToPage(index + 1);
                                    setLoading(true);
                                    window.scrollTo({
                                        top: 0,
                                        behavior: 'smooth',
                                    });
                                }}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

const AnswerDisplay = ({ answer, newTestTrigger, loading }: { answer: any, newTestTrigger: number, loading: boolean }) => {
    const { id, name, availability, note, ...others } = answer;
    const [newTestToppings, setNewTestToppings] = useState<ToppingOptions[]>([]);

    useEffect(() => {
        const randomToppings = getRandomToppings();
        const formattedToppings = randomToppings.map((topping: any) => ({
            value: topping,
            label: topping,
        }));
        setNewTestToppings(formattedToppings);
    }, [newTestTrigger]);

    return (
        <div className='relative bg-white dark:bg-gray-200 ring-1 ring-black ring-opacity-10 rounded-none lg:rounded-lg shadow-lg px-3 md:px-5 py-2 md:py-4 w-screen lg:w-[50vw] xl:w-[33vw]'>
            <div className='absolute top-3 right-0'>
                <div className='hidden items-center gap-2'>
                    <>
                        {availability ? (
                            <span className='rounded-l bg-lime-700 text-white text-center pl-2 p-1 font-light text-[.8em]'>
                                {'In stock'}
                            </span>
                        ) : (
                            <span className='rounded-l bg-gray-200 text-gray-800 text-center px-2 py-1 text-xs ring-1 ring-black/10 shadow-lg'>
                                {'Out of stock'}
                            </span>
                        )}
                    </>
                </div>
            </div>
            <h3 className='font-lg font-semibold py-2 border-b mb-3 dark:text-gray-800 text-center'>
                {answer?.name}
            </h3>
            <div className='flex flex-col lg:flex-row w-full justify-evenly gap-x-3 rounded-lg'>
                    <Ingredients {...others} newTestToppings={newTestToppings} />
            </div>
            {note && (
                <div className='border-t border-dotted border-gray-500 mt-3 w-full'>
                    <span className='text-gray-500 font-light text-[.8em] mb-2'>{'Note: '}</span>
                    <div className='bg-gray-100 text-gray-600 px-2 py-1 text-[.9em] rounded-lg'>
                        {note}
                    </div>
                </div>
            )}
        </div>
    );
};

// For dropbox topping
export interface ToppingOptions {
    value: string,
    label: string
}

export const toppingOptions: ToppingOptions[] = toppings.map((topping) => ({
    value: topping,
    label: topping,
}));

const Ingredients = ({
    toppings,
    newTestToppings,
    ...ingredients
}: {
    toppings: any[];
    newTestToppings: ToppingOptions[];
    [key: string]: any;
}) => {
    const [show, setShow] = useState(window.innerWidth > 768 ?? false);
    const animatedComponents = makeAnimated();
    const [selectedToppings, setSelectedToppings] = useState<ToppingOptions[]>([]);
    const [buttonHovered, setButtonHovered] = useState(false);

    const handleToppingsChange = (selectedOptions: any) => {
        setSelectedToppings(selectedOptions);
    };

    useEffect(() => {
        setSelectedToppings(newTestToppings);
    }, [newTestToppings]);

    const handleRecommend = () => {
        const randomToppings: string[] = getRandomToppings();
        const convertedToppings: ToppingOptions[] = randomToppings.map(topping => ({
            value: topping,
            label: topping,
        }));
        setSelectedToppings(convertedToppings);
    };

    const hoverButton = () => {
        setButtonHovered(true);
    }

    const leaveHoverButton = () => {
        setButtonHovered(false);
    }

    return (
        <div className='w-full'>
            <div
                className='flex items-center justify-between bg-blue-100 dark:bg-blue-500 text-gray-600 dark:text-gray-50 p-2'
                onClick={() => setShow(window.innerWidth > 768 ? true : !show)}
            >
                <div className={'lg:hidden inline-block ' + (show ? 'rotate-180' : '')}>
                    <svg
                        className='w-6 h-6 text-gray-800 dark:text-white'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        fill='none'
                        viewBox='0 0 24 24'
                    >
                        <path
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='m8 10 4 4 4-4'
                        />
                    </svg>
                </div>
                {'Ingredients'}
            </div>
            {show && (
                <div className={'px-3 lg:px-4' + (show && ' py-3 border-x')}>
                    <table className='w-full'>
                        {ingredients && (
                            <tbody>
                                {Object.keys(ingredients).map((key: string, index: number) => (
                                    <tr key={index}>
                                        <th className='text-left text-gray-500'>
                                            {String(key).charAt(0).toUpperCase() + String(key).slice(1)}
                                        </th>
                                        <td>
                                            <div className='p-2 dark:text-gray-600'>
                                                {ingredients[key] &&
                                                    !Array.isArray(ingredients[key]) &&
                                                    String(ingredients[key]).length > 0 && (
                                                        <>
                                                            <span className='text-gray-800 dark:text-gray-800'>
                                                                {String(ingredients[key]).charAt(0).toUpperCase() +
                                                                    String(ingredients[key]).slice(1)}
                                                            </span>
                                                        </>
                                                    )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                    </table>
                    <div className='w-full mt-3'>
                        <div className='text-gray-500 font-bold mb-2'>
                            Toppings ({selectedToppings.length}):
                            <Select
                                className='dropbox'
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                value={selectedToppings}
                                onChange={handleToppingsChange}
                                isMulti
                                options={toppingOptions}
                                placeholder="Select toppings"
                                styles={{
                                    control: (provided, state) => ({
                                        ...provided,
                                        margin: '10px 0'
                                    })
                                }}
                            />
                            <button style=
                                {{
                                    border: '1px solid',
                                    padding: '10px',
                                    borderRadius: '10px',
                                    backgroundColor: buttonHovered ? 'rgb(219, 234, 254)' : '',
                                    transition: "background-color 0.2s linear"
                                }}
                                onClick={handleRecommend}
                                onMouseEnter={hoverButton}
                                onMouseLeave={leaveHoverButton}
                            >
                                Smart Suggestions
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
