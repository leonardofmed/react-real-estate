import Link from 'next/link';
import { Menu, MenuButton, MenuList, IconButton, Flex, Box, Spacer, MenuItem } from '@chakra-ui/react';
import { FcMenu, FcHome, FcAbout } from 'react-icons/fc';
import { BsSearch } from 'react-icons/bs';

const Navbar = () => (
    <Flex p={2} borderBottom="1px" borderColor={"gray.100"}>
        <Box fontSize="3xl" color="blue.400" fontWeight={"bold"}>
            <Link href={"/"}>Realtor</Link>
        </Box>
        <Spacer />
        <Box>
            <Menu>
                <MenuButton as={IconButton} icon={<FcMenu />} variant="outlined" color={"red.400"}></MenuButton>
                <MenuList>
                    <Link href={"/"} passHref>
                        <MenuItem icon={<FcHome />}> Home </MenuItem>
                    </Link>
                    <Link href={"/search"} passHref>
                        <MenuItem icon={<BsSearch />}> Search </MenuItem>
                    </Link>
                    <Link href={"/search?purpose=for-sale"} passHref>
                        <MenuItem icon={<FcAbout />}> But Property </MenuItem>
                    </Link>
                    <Link href={"/search?purpose=for-rent"} passHref>
                        <MenuItem icon={<FcHome />}> Rent Property </MenuItem>
                    </Link>
                </MenuList>
            </Menu>
        </Box>
    </Flex>
);

export default Navbar;