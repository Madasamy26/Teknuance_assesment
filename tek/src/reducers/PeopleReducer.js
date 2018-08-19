import people from '../people.json'

const PeopleReducer = (state = [], action) => {

    switch (action.type) {
        case 'intital_people':
            return people.People;
        case 'ADD_POST':
            return state.concat([action.data]);
        case 'DELETE_POST':
            return state.filter((people) => people.id !== action.id)

        default:
            return people.People;
    }

}
export default PeopleReducer;