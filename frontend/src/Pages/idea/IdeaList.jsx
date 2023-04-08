import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import IdeaCard from '../../components/idea/IdeaCard';
import { fetchIdeas } from '../../features/idea/ideaSlice';
import { FaBackward } from 'react-icons/fa';
import './style/style.css';
import Cookies from 'js-cookie';
import Loading from '../../components/common/Loading';

const IdeaList = () => {
  const ideaList = useSelector((state) => state.ideas);
  const [currentPage, setCurrentPage] = useState(0);
  const [dataPerPage] = useState(5);
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIdeas());
  }, [dispatch]);
  // console.log('ideas', ideaList);

  const handlePageClick = ({ selected }) => {
    // console.log('page click');
    setCurrentPage(selected);
  };
  const offset = currentPage * dataPerPage;
  let pageCount = 0;
  let currentData = [];

  if (!ideaList.loading && ideaList.ideas.data !== undefined) {
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
          is_anonymous={d.is_anonymous}
          department_description={d.department.department_description}
        />
      ));

    console.log('current data', currentData);
  }

  if (ideaList.loading || ideaList.ideas.data === undefined) {
    return <Loading />;
  }

  if (ideaList.error) {
    return <p>There is an error: {ideaList.error}</p>;
  }

  return (
    <>
      {!ideaList.loading && ideaList.ideas !== undefined ? (
        <div className="flex flex-col pt-[50px] px-[4rem] py-[2rem] space-y-2">
          <div className="grid grid-cols-1 gap-1 space-y-2 lg:pb-[2rem]">{currentData}</div>
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
        <Loading />
      )}
    </>
  );
};

export default IdeaList;
