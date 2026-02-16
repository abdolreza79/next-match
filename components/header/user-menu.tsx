import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserAvatar } from './user-avatar';
import { auth, signOut } from '@/auth';
import Link from 'next/link';

const UserMenu = async () => {
  const session = await auth();
  if (!session?.user) {
    return null;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='size-10 rounded-full'>
        <Button className='rounded-full bg-white'>
          <UserAvatar user={session.user} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={`/members/${session?.user?.id}/edit`}>Edit Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <form
            action={async () => {
              'use server';
              await signOut({redirectTo: '/'});
            }}
          >
            <Button className='bg-red-500 rounded-sm text-white h-7'>
              Sign out
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
