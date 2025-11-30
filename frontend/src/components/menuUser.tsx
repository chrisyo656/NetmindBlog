import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown"
import { User } from "@heroui/user";
import { useAuthStore } from "../stores/useAuthStore";
import type { MenuUserProps } from "../types";

function MenuUser({ profile }: MenuUserProps) {
  const logOut = useAuthStore(state => state.logout);

  const handleLogOut = () => {
    logOut();
  }

  return (
    <div className="flex items-center gap-4">
      <Dropdown
        placement="bottom-start"
      >
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{ isBordered: true, name: profile.fullName, className: 'text-text1', }}
            className="text-text1"
            classNames={{ base: 'text-text1' }}
            description={`@${profile.userName}`}
            name={profile.fullName}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className=" flex" textValue='Información del Usuario'>
            <section className='flex flex-col grow gap-y-2'>
              <p className="font-bold text-center">{profile.fullName}</p>
              <p className="text-default-500">@{profile.userName}</p>
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


