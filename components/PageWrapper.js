import {
  Box,
  Flex,
  Stack,
  Icon,
  Text,
  Button,
  Link as ChakraLink,
  Divider,
  Show,
  Hide,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

import Link from "next/link";
import {
  AiOutlineHome,
  AiOutlineBell,
  AiOutlineMail,
  AiOutlineUser,
} from "react-icons/ai";
import {
  HiOutlineHashtag,
  HiOutlineBookmark,
  HiPencil,
  HiOutlineDotsCircleHorizontal,
} from "react-icons/hi";
import { FaConnectdevelop, FaListUl } from "react-icons/fa";
import {
  connectWallet,
  getCurrentWalletConnected,
} from "/components/utils/interact";
import ConnectWalletButton from "/components/ConnectWalletButton";
import CawModal from "/components/CawModal";
import { useEffect, useState } from "react";

const SideButton = (label, url, icon) => (
  <Box my="1vh">
    <Link href={`/${url}`} passHref>
      <ChakraLink>
        <Flex flexDirection="row" alignItems="center">
          <Icon color="brand.100" w={7} h={7} as={icon} />
          <Hide below="md">
            <Text p="2" fontSize="2xl" color="whiteAlpha.900">
              {label}
            </Text>
          </Hide>
        </Flex>
      </ChakraLink>
    </Link>
  </Box>
);

//Left Side Header - Every Page
const PageWrapper = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Stack
      direction="row"
      p="2"
      h="calc(100vh)"
      bgGradient="radial(blackAlpha.800, blackAlpha.900)"
    >
      <Box w="30vw" />
      {/* LEFT: Begin Left Side Header */}
      <Flex flexDirection="column" justifyContent={"space-between"} p="10">
        <Flex
          alignItems={"flex-start"}
          flexDirection="column"
          justifyContent={"space-around"}
        >
          {SideButton("Home", "/", AiOutlineHome)}
          {SideButton("Explore", "/explore", HiOutlineHashtag)}
          {SideButton("Notifications", "/notifications", AiOutlineBell)}
          {SideButton("Messages", "/messages", AiOutlineMail)}
          {SideButton("Bookmarks", "/bookmarks", HiOutlineBookmark)}
          {SideButton("Lists", "/lists", FaListUl)}
          {SideButton("Profile", "/profile", AiOutlineUser)}
          <Menu my="1vh">
            <MenuButton>
              <Flex flexDirection="row" alignItems="center">
                <Icon
                  color="brand.100"
                  w={7}
                  h={7}
                  as={HiOutlineDotsCircleHorizontal}
                />
                <Hide below="md">
                  <Text p="2" fontSize="2xl" color="whiteAlpha.900">
                    More
                  </Text>
                </Hide>
              </Flex>
            </MenuButton>

            <MenuList>
              <MenuItem>Bop It</MenuItem>
              <MenuItem>Cheesey</MenuItem>
              <MenuItem>Cuando</MenuItem>
              <MenuItem>Come Back to Pai</MenuItem>
            </MenuList>
          </Menu>

          {/* The Main Button Baby */}
          <Button
            my="1vh"
            w="15vw"
            flexDirection="row"
            variant="solid"
            bgGradient="linear(to-l, brand.100, brand.200)"
            onClick={onOpen}
          >
            <Hide below="md">
              <Text p="2" fontSize="xl" color="black">
                Post
              </Text>
            </Hide>
            <Show below="md">
              <Icon color="black" w={7} h={7} as={HiPencil} />
            </Show>
          </Button>
        </Flex>

        <CawModal isOpenProp={isOpen} onCloseProp={onClose} />

        <Flex alignItems={"flex-start"}>
          <ConnectWalletButton />
        </Flex>
      </Flex>
      <Divider orientation="vertical" height="auto" />

      {/*The rest of the App */}
      {children}
    </Stack>
  );
};

export default PageWrapper;
