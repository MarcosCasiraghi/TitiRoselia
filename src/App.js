import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Products from "./pages/products/products";
import Product from "./pages/product/product"
import { MantineProvider } from "@mantine/core";
import "./App.css";
import NotFound from "./pages/notfound/notfound";

function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCss
      theme={{
        // fontFamily: 'Playfair Display, serif'
        // fontFamily: 'Merriweather, serif'
        fontFamily: 'Lora, serif',
        headings: { fontFamily: 'Lora, serif', fontWeight: 200 },
        components: {
          Text: {
            styles: {
              root: {
                fontWeight: 200,
              },
            },
          },
        },
      }}
    >
      <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Products />} />
            <Route path="/productos/:productId" element={<Product />} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
