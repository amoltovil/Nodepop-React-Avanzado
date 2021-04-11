import React from 'react';
import { getAdvertsTags } from '../../../api/adverts';

// const ListItem = (props) => {
//     return <li>{props.value}</li>;
// };
  
const TagsList = (props) => {

    const [tags, setTags] = React.useState([]);

    React.useEffect(() => {
        getAdvertsTags().then(setTags);
    }, []);
  
    return (
        <ul className="tagsList">
            {tags.map((tag) => (
                <li key={tag.toString()} value={tag}></li>))}           
        </ul>
    )
};

export default TagsList;