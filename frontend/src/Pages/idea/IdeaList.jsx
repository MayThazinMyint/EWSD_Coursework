import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import IdeaCard from '../../components/idea/IdeaCard';
import { fetchIdeas } from '../../features/idea/ideaSlice';
import { FaBackward } from 'react-icons/fa';
import './style/style.css';

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
  const [dataPerPage] = useState(5);
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

  if (!ideaList.loading ) {
    pageCount = Math.ceil(ideaList.ideas.data.length / dataPerPage);

    currentData = ideaList.ideas.data
      .slice(offset, offset + dataPerPage)
      .map((d) => (
        <IdeaCard
          category_type={d.category.category_type}
          idea_description={d.idea_description}
          id={d.idea_id}
          username={d.user.user_name}
          hideVote={true}
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
      {!ideaList.loading && ideaList.ideas ? (
        
          <div className="flex flex-col px-[4rem] py-[2rem] space-y-2">
            <div className="grid grid-cols-1 gap-1 space-y-2 lg:pb-[2rem]">
              {currentData}
            </div>
            <ReactPaginate
              pageCount={pageCount}
              onPageChange={handlePageClick}
              marginPagesDisplayed={1}
              previousLabel={<span className="previous">Previous</span>}
              nextLabel={<span className="next">Next</span>}
              containerClassName={'pagination'}
              activeClassName={'active'}
              // nextLabel={'next'}
              // pageCount={pageCount}
              // onPageChange={handlePageClick}
              // containerClassName={'pagination'}
              // previousLinkClassName={'previous_page'}
              // nextLinkClassName={'next_page'}
              // disabledClassName={'pagination_disabled'}
              // activeClassName={'pagination_active'}
              // previousLabel={<FaBackward style={{ fontSize: 18, width: 150 }} />}
            />
            {/* pageCount={10}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        previousLabel={<span className="previous">Previous</span>}
        nextLabel={<span className="next">Next</span>}
        containerClassName={'pagination'}
        activeClassName={'active'} */}
          </div>
        
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default IdeaList;
