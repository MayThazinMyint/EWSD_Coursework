import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ConnectedFocusError } from 'focus-formik-error';
import { RiDeleteBinLine } from 'react-icons/ri';
import ErrorServer from '../../../components/ErrorServer';
import Loading from '../../../components/common/Loading'
import {
  fetchCategories,
  postCategory,
  deleteCategory,
} from '../../../features/category/categorySlice';
import Label from '../../../components/Label';
import Sidebar from '../../../components/sidebar/Sidebar';

const CategoryList = () => {
  const [showModal, setShowModal] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [categoryId, setCategoryId] = useState();
    const [errorServer, setErrorServer] = useState('');

  const handleCancel = () => {
    setShowWarning(false);
    setErrorServer('');
  };

  const categoryList = useSelector((state) => state.category);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDeleteClick = (userId) => {
    setCategoryId(userId);
    setShowWarning(true);
    // //console.log('user id', userId);
  };

  console.log('categorylist', categoryList.categories);
  if (categoryList.loading) {
    return <Loading />
  }


  const initialValues = {
    category_code: '',
    category_type: '',
    is_active: 1,
  };

  // validations
  const validationSchema = Yup.object({
    category_code: Yup.string().required('Category Code is required.'),
    category_type: Yup.string().required('Category Name is required.'),
  });
  // for preventing on enter key formik
  const onKeyDown = (keyEvent) => {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  };
  //submit data
  const onSubmit = async (data, { resetForm }) => {
    dispatch(postCategory(data));
    
    resetForm();
    setShowModal(false);
    dispatch(fetchCategories());
  };

  const handleDeleteConfirmClick = () => {
    dispatch(deleteCategory(categoryId)).then((res) => {
      // nconsole.log('delete res', res);
      if (res.error) {
      setErrorServer('This category is in use.');
      } else {
        setCategoryId(null);
        setShowWarning(false);
        // console.log('categoryy id', categoryId);
        dispatch(fetchCategories());
      }
    });
  };
  return (
    <div>
      <Sidebar />
      <div className="flex flex-col pl-[400px] pr-[250px] py-[50px] mt-[50px]">
        <div className="flex justify-between space-x-2 py-4">
          <p className="font-bold text-lg ">Category List</p>

          <button
            className="w-[8rem] text-white bg-slate-600 hover:bg-slate-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-3 py-2.5 text-center"
            type="button"
            onClick={() => setShowModal(true)}
          >
            Add
          </button>
        </div>
        {showModal ? (
          <>
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div
                className="fixed inset-0 w-full h-full bg-black opacity-40"
                onClick={() => setShowModal(false)}
              ></div>
              <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative w-full max-w-md p-4 mx-auto bg-white rounded-md shadow-lg">
                  <div className="mt-3 flex justify-center">
                    <div className="mt-2 text-center sm:ml-4 sm:text-left">
                      <h4 className="text-lg font-medium text-gray-800 mb-4">
                        Add a new Category
                      </h4>
                      <Formik
                        enableReinitialize
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                      >
                        {(formik) => (
                          <Form className="space-y-2 " onKeyDown={onKeyDown}>
                            <ConnectedFocusError />

                            <div className="flex flex-col items-center space-y-4">
                              <div className="flex flex-row items-center justify-between gap-2">
                                <Label text="Category Code" required="*" hint="" />
                                <Field
                                  type="text"
                                  name="category_code"
                                  placeholder="Enter category code"
                                  className={` w-[200px] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block p-2.5  ${
                                    formik.errors.category_code && formik.touched.category_code
                                      ? 'border border-red-500'
                                      : ''
                                  }`}
                                  autoComplete="off"
                                />
                              </div>
                              <div className="validate-show">
                                <ErrorMessage
                                  name="category_code"
                                  component="div"
                                  className="text-red-600"
                                />
                              </div>
                              <div className="flex flex-row items-center justify-between gap-2">
                                <Label text="Category Type" required="*" hint="" />
                                <Field
                                  type="text"
                                  name="category_type"
                                  placeholder="Enter category type"
                                  className={` w-[200px] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block p-2.5  ${
                                    formik.errors.category_type && formik.touched.category_type
                                      ? 'border border-red-500'
                                      : ''
                                  }`}
                                  autoComplete="off"
                                />
                              </div>
                              <div className="validate-show">
                                <ErrorMessage
                                  name="category_type"
                                  component="div"
                                  className="text-red-600"
                                />
                              </div>
                            </div>
                            <div className="items-center gap-2 mt-3 sm:flex">
                              <button
                                className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                                onClick={() => setShowModal(false)}
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="w-full mt-2 p-2.5 flex-1 text-white bg-slate-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                              >
                                Add
                              </button>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
        {!categoryList.loading ? (
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-white border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Code
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryList.categories.data.map((category) => (
                      <tr
                        className={`border-b
                        //user.id % 2 === 0 ? "bg-gray-100" : "bg-white"
                      `}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {category.category_id}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {category.category_code}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {category.category_type}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <button onClick={() => handleDeleteClick(category.category_id)}>
                            <RiDeleteBinLine
                              size={20}
                              id={category.category_id}

                              // className="text-red-500 fill-current w-6 h-6"
                            />
                          </button>
                          {/* <button
                          onClick={() => setShowWarning(true)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Open Modal
                        </button> */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : null}
        {showWarning ? (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
              <div
                className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Delete Warning
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm leading-5 text-gray-500">
                        Are you sure you want to delete?.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-[10px]">
                  <span className="flex w-full rounded-md shadow-sm sm:w-auto">
                    <button
                      type="button"
                      onClick={handleDeleteConfirmClick}
                      className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-500 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    >
                      Delete
                    </button>
                  </span>
                  <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    >
                      Cancel
                    </button>
                  </span>
                </div>
                <ErrorServer msg={errorServer} />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CategoryList;
