const tableRes = {
    name: '',
    date: Date,
    id: '',

}


class Restaurant {
    constructor() {
        // Tables stored as an object with table sizes and counts
        this.tables = {
            2: 5,   // 5 tables of 2 persons
            4: 8,   // 8 tables of 4 persons
            6: 4,   // 4 tables of 6 persons
            8: 2    // 2 tables of 8 persons
        };
        
        // Tracking occupied tables
        this.occupiedTables = {};
    }

    hasAvailableTable() {
        return Object.values(this.tables).some(count => count > 0);
    }

    hasTableForPartySize(partySize) {
        return Object.keys(this.tables)
            .map(Number)
            .some(size => size >= partySize && this.tables[size] > 0);
    }
    
    findSuitableTable(partySize) {
        /**
         * Find the most appropriate table for a given party size
         * 
         * Strategy:
         * 1. First, try to find an exact match
         * 2. If no exact match, find the smallest table larger than party size
         * 3. Return null if no suitable table is available
         */
        // Get available table sizes, sorted from smallest to largest
        if (!this.hasAvailableTable()) {
            return [false, "Restaurant is fully booked"];
        }

        if (!this.hasTableForPartySize(partySize)) {
            return [false, 'No tables availabkle for current party size'];
        }
        const availableSizes = Object.keys(this.tables)
            .map(Number)
            .filter(size => this.tables[size] > 0)
            .sort((a, b) => a - b);
        
        // Find exact match first
        if (availableSizes.includes(partySize)) {
            return partySize;
        }
        
        // Find smallest table that can accommodate the party
        for (let size of availableSizes) {
            if (size >= partySize) {
                return size;
            }
        }
        
        return null;
    }
    
    makeReservation(partySize, reservationId) {
        /**
         * Make a reservation for a given party
         */
        // Find suitable table
        const tableSize = this.findSuitableTable(partySize);
        
        if (tableSize === null || tableSize === 0) {
            return [false, "No tables available"];
        }
        
        // Reduce available tables
        this.tables[tableSize]--;
        
        // Track the reservation
        this.occupiedTables[reservationId] = {
            partySize: partySize,
            tableSize: tableSize
        };
        
        return [true, `Reserved a ${tableSize}-person table`];
    }
    
    cancelReservation(reservationId) {
        /**
         * Cancel a specific reservation
         */
        if (!(reservationId in this.occupiedTables)) {
            return [false, "Reservation not found"];
        }
        
        // Retrieve reservation details
        const reservation = this.occupiedTables[reservationId];
        
        // Return the table to available tables
        this.tables[reservation.tableSize]++;
        
        // Remove from occupied tables
        delete this.occupiedTables[reservationId];
        
        return [true, "Reservation cancelled successfully"];
    }
    
    getRestaurantStatus() {
        /**
         * Get current restaurant status
         */
        return {
            availableTables: this.tables,
            occupiedTables: Object.keys(this.occupiedTables).length,
            totalReservations: Object.values(this.tables).reduce((a, b) => a + b, 0)
        };
    }
}

// Demonstration function
function main() {
    // Create restaurant
    const restaurant = new Restaurant();
    
    // Make some sample reservations
    console.log(restaurant.makeReservation(3, "RES001"));  // Should use 4-person table
    console.log(restaurant.makeReservation(5, "RES002"));  // Should use 6-person table
    console.log(restaurant.makeReservation(2, "RES003"));  // Exact match
    
    // Check restaurant status
    console.log(restaurant.getRestaurantStatus());
    
    // Cancel a reservation
    console.log(restaurant.cancelReservation("RES001"));
    
    // Check updated status
    console.log(restaurant.getRestaurantStatus());
}

// Uncomment to run demonstration
// main();