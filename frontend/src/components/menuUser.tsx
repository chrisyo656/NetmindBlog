import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown"
import { User } from "@heroui/user";

interface InfUser {
  name: string | undefined
  userName: string | undefined
  email: string | undefined
  area: string | undefined
}

function MenuUser(infUser: InfUser) {

  const handleLogOut = () => {
    //logout()
  }

  return (
    <div className="flex items-center gap-4">
      <Dropdown 
      placement="bottom-start"
      >
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{ isBordered: true, name: infUser.name, className: 'text-text1', }}
            className="text-text1"
            classNames={{ base: 'text-text1' }}
            description={infUser.area}
            name={infUser.name}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className=" flex" textValue='Información del Usuario'>
            <section className='flex flex-col grow gap-y-2'>
              <p className="font-bold text-center">{infUser.userName}</p>
              <p>{infUser.email}</p>
            </section>

          </DropdownItem>
          <DropdownItem key="logout" className='text-buttonPrimaryText bg-buttonPrimary mt-1' textValue="Cerrar Sesión" onPress={handleLogOut}>
            Cerrar Sesion
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}
export default MenuUser
