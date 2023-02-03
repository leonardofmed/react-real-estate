import Link from "next/link";
import Image from "next/image";
import { Flex, Box, Text, Button } from "@chakra-ui/react";

import { baseUrl, fetchApi } from '../utils/fetchApi';

interface BannerProps {
  purpose: string
  imageUrl: string
  title1: string
  title2: string
  desc1: string
  desc2: string
  linkName: string
  buttonText: string
}

const Banner = (props: BannerProps) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
    <Image src={props.imageUrl} width={500} height={500} alt="banner"></Image>
    <Box p={5}>
      <Text color="gray.500" fontSize="sm" fontWeight={"medium"}>{props.purpose}</Text>
      <Text fontSize="3x1" fontWeight="bold">{props.title1}<br /> {props.title2}</Text>
      <Text fontSize="lg" paddingTop="3" paddingBottom="3" color="gray.700" >{props.desc1}</Text>
      <Button fontSize="xl">
        <Link href={props.linkName}>{props.buttonText}</Link>
      </Button>
    </Box>
  </Flex>
)

export default function Home({ propertiesForSale, propertiesForRent } : any) {
  console.log(propertiesForSale, propertiesForRent);
  return (
    <Box>
      <h1>Hello World!</h1>
      <Banner
        purpose="BUY A HOME"
        title1="Find, Buy & Own Your"
        title2="Dream Home"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more"
        buttonText={"Explore Buying"}
        linkName="/search?purpose=for-sale"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />
      <Flex flexWrap={"wrap"}>
        {/** Fetch the properties and map over them... */}
      </Flex>
      <Banner
        purpose="RENT A HOME"
        title1="Rental Homes for"
        title2="Everyone"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more"
        buttonText={"Explore Renting"}
        linkName="/search?purpose=for-rent"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
      />
      <Flex flexWrap={"wrap"}>
        {/** Fetch the properties and map over them... */}
      </Flex>
    </Box>
  )
}

export async function getStaticProps() {
  const propertyForSale: any = await fetchApi(`${baseUrl}/properties/list?locationExternalIds=5002&purpose=for-sale&hitsPerPage=6`);
  const propertyForRent: any = await fetchApi(`${baseUrl}/properties/list?locationExternalIds=5002&purpose=for-rent&hitsPerPage=6`);
  console.log(propertyForSale, propertyForRent);

  return {
    props: {
      propertiesForSale: propertyForSale.hits || null,
      propertiesForRent: propertyForRent.hits || null
    }
  }
}