import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import IdeaCard from '../../components/idea/IdeaCard';
import { fetchIdeas } from '../../features/idea/ideaSlice';
import { FaBackward } from 'react-icons/fa';
const data = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Bob' },
  { id: 4, name: 'Alice' },
  { id: 5, name: 'Mary' },
  { id: 6, name: 'Peter' },
  { id: 7, name: 'Sarah' },
  { id: 8, name: 'Mike' },
  { id: 9, name: 'Kate' },
  { id: 10, name: 'Alex' },
];

const IdeaList = () => {
  const ideaList = useSelector((state) => state.ideas);
  const [currentPage, setCurrentPage] = useState(0);
  const [dataPerPage] = useState(10);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIdeas());
    console.log('Mounted');

    return () => {
      console.log('Unmounted');
    };
  }, [dispatch]);
  console.log('ideas', ideaList);

  const handlePageClick = ({ selected }) => {
    console.log('page click');
    setCurrentPage(selected);
  };

  const offset = currentPage * dataPerPage;
  let pageCount = 0;
  let currentData = [];

  if (!ideaList.loading && ideaList.ideas.data.length>0) {
    pageCount = Math.ceil(ideaList.ideas.data.length / dataPerPage);

    currentData = ideaList.ideas.data
      .slice(offset, offset + dataPerPage)
      .map((d) => (
        <IdeaCard
          category_type={d.category.category_type}
          idea_description={d.idea_description}
          id={d.idea_id}
        />
      ));

    console.log('current data', currentData);
  }

  if (ideaList.loading || ideaList.ideas.data === undefined) {
    return <p>Loading...</p>;
  }

  if (ideaList.error) {
    return <p>There is an error: {ideaList.error}</p>;
  }

  return (
    <>
    <p>idea list</p>
      {!ideaList.loading && ideaList.ideas ? (
        
        <div className="flex flex-col">
          <div className="flex flex-row flex-wrap justify-between">{currentData}</div>
          <ReactPaginate
            nextLabel={'next'}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            previousLinkClassName={'previous_page'}
            nextLinkClassName={'next_page'}
            disabledClassName={'pagination_disabled'}
            activeClassName={'pagination_active'}
            previousLabel={<FaBackward style={{ fontSize: 18, width: 150 }} />}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default IdeaList;
