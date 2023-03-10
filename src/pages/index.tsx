import Link from "next/link";
import Image from "next/image";
import { Flex, Box, Text, Button } from "@chakra-ui/react";

import Property from "@/components/Property";
import FetchAPI from '../utils/fetchApi';

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

const Banner = ({ purpose, title1, title2, desc1, desc2, buttonText, linkName, imageUrl }: BannerProps) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
    <Image src={imageUrl} width={500} height={500} alt="banner"></Image>
    <Box p={5}>
      <Text color="gray.500" fontSize="sm" fontWeight={"medium"}>{purpose}</Text>
      <Text fontSize="3x1" fontWeight="bold">{title1}<br /> {title2}</Text>
      <Text fontSize='lg' paddingTop='3' paddingBottom='3' color='gray.700'>{desc1}<br />{desc2}</Text>
      <Button fontSize="xl">
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
)

const Home = ({ propertiesForSale, propertiesForRent } : any) => (
  <Box>
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
      {propertiesForSale.map((property: any) => <Property property={property} key={property.id}></Property> )}
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
      {propertiesForRent.map((property: any) => <Property property={property} key={property.id}></Property> )}
    </Flex>
  </Box>
)

export async function getStaticProps() {
  const fetch = new FetchAPI();
  const propertyForSale: any = await fetch.fetchApi(`${fetch.baseUrl}/properties/list?purpose=for-sale&hitsPerPage=6&locationExternalIDs=5002`);
  const propertyForRent: any = await fetch.fetchApi(`${fetch.baseUrl}/properties/list?purpose=for-rent&hitsPerPage=6&locationExternalIDs=5002`);

  return {
    props: {
      propertiesForSale: propertyForSale.hits || null,
      propertiesForRent: propertyForRent.hits || null
    }
  }
}

export default Home;