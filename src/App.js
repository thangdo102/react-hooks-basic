import { useEffect, useState } from 'react';
import './App.scss';
import Pagination from './components/Pagination';
import PostList from './components/PostList';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import queryString from 'query-string';
import Clock from './components/Clock';

function App() {
  const [todoList, setTodoList] = useState(
    [
      { id: 1, title: 'Do Van Thang' },
      { id: 2, title: 'Do Anh Tuan' },
      { id: 3, title: 'Do Ha My' }
    ]);

  function handleTodoClick(todo) {
    console.log(todo);
    const index = todoList.findIndex(x => x.id = todo.id);
    if (index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }

  function handleTodoFormSubmit(formValues) {
    console.log('Form submit: ', formValues);

    const newTodo = {
      id: todoList.length + 1,
      ...formValues, //lấy tất cả input form
    };
    const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
    //add new todo to current todo list
  }


  // SỬ DỤNG userEffect ĐỂ LẤY DỮ LIỆU TỪ SERVER RỒI GEN RA
  const [postList, setPostList] = useState([]);


  //state này dùng để mỗi khi filters có thay đổi thì sẽ phải load lại trang theo đúng filter đó. Ví dụ như khi phân trang thì sẽ thay đổi số phần tử -> load lại trang, khi search thì cũng phải load lại trang, chỉ hiển thị ra cái mình search
  const [filters, setFilters] = useState({
    _limit: 5,  //so ban ghi trong moi trang
    _page: 1,  //trang hien tai
  });

  useEffect(() => {
    async function fetchPostList() {
      try {
        const paramString = queryString.stringify(filters);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log(responseJSON);

        const { data, pagination } = responseJSON;
        debugger
        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log('Error', error.message);
      }
    }

    fetchPostList();
  }, [filters]);

  // CODE PHAN TRANG

  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  });

  function handlePageChange(newPage) {
    console.log('New page: ', newPage);
    setFilters({
      ...filters,
      _page: newPage,
    })
  }

  return (
    <div className="app">
      {/* <TodoList todos={todoList} onTodoClick={handleTodoClick}></TodoList> */}
      {/*       <TodoForm onSubmit={handleTodoFormSubmit}></TodoForm> */}
      {/* <TodoForm onSubmit={handleTodoFormSubmit}></TodoForm> */}
      {/* <PostList posts={postList} />

      <Pagination pagination={pagination} onPageChange={handlePageChange} /> */}
      <Clock />
    </div>
  );
}

export default App;
