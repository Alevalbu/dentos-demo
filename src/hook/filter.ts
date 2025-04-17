import {useState, useMemo} from 'react';
import {User} from '../types';


interface FilterValues {
    name: string;
    email: string;
    scoreMin: string;
    scoreMax: string;
    salaryMin: string;
    salaryMax: string;
    verified: string; // 'all', 'verified', 'unverified'
  }

  interface UseFilterResult {
    filteredData: User[];
    filterValues: FilterValues;
    handleFilterChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    resetFilters: () => void;
    newUser: (newUser: User) => void;
  }

  const initialFilterValues: FilterValues = {
    name: '',
    email: '',
    scoreMin: '',
    scoreMax: '',
    salaryMin: '',
    salaryMax: '',
    verified: 'all',
  };

  function generateRandomString(length = 16) {
    // Define the characters to use (uppercase letters and numbers)
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    
    // Create a random string of the specified length
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      result += charset[randomIndex];
    }
    
    return result;
  }


  export const useFilters = (data: User[]): UseFilterResult => {
    const [filterValues, setFilterValues] = useState<FilterValues>(initialFilterValues);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFilterValues((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const newUser = (user: User) => {
        const newUser = {
            ...user,
            _id: generateRandomString(),
        }
    }

    const resetFilters = () => {
        setFilterValues(initialFilterValues);
    }

    const filteredData = useMemo(() => {
        return data.filter(user => {
            if (filterValues.name && !user.name.toLowerCase().includes(filterValues.name.toLowerCase())) {
                return false;
            }

            if (filterValues.email && !user.email.toLowerCase().includes(filterValues.email.toLowerCase())) {
                return false;
            }

            const scoreMin = filterValues.scoreMin !== '' ? parseFloat(filterValues.scoreMin) : Number.MIN_SAFE_INTEGER;
            const scoreMax = filterValues.scoreMax !== '' ? parseFloat(filterValues.scoreMax) : Number.MAX_SAFE_INTEGER;
            if (user.score < scoreMin || user.score > scoreMax) {
                return false;
            }

            const salaryMin = filterValues.salaryMin !== '' ? parseFloat(filterValues.salaryMin) : Number.MIN_SAFE_INTEGER;
            const salaryMax = filterValues.salaryMax !== '' ? parseFloat(filterValues.salaryMax) : Number.MAX_SAFE_INTEGER;
            if (user.salary < salaryMin || user.salary > salaryMax) {
                return false;
            }

            if (filterValues.verified === 'verified' && !user.verified) {
                return false;
            }

            if (filterValues.verified === 'unverified' && user.verified) {
                return false;
            }

            return true;
        })
    }, [data, filterValues]);

    return {filteredData, resetFilters, handleFilterChange, filterValues, newUser};
  }