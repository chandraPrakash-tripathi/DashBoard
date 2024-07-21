import Navbar from '../../components/Navbar';
import EditEmployee from '../../components/EditEmployee'
interface EditEmployeePageProps{
    id: string;
}
const EditEmployeePage = ({id}:EditEmployeePageProps) => {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Create Employee", path: "/createemployee" },
    { name: "Employee List", path: "/employeelist" },
];
  return (
    <div>
    <div><Navbar items={navItems} isLoggedin={false} /></div>
    <div className='bg-yellow-300'><p>Edit Employee</p></div>
    <div className="flex flex-col justify-center"><div className='flex items-center justify center'> <EditEmployee employeeId={id}/>  </div></div>
    
    </div>
  )
}

export default EditEmployeePage