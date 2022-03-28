import {render,screen} from '@testing-library/react'
import App from './App'

test('testing admin ui', () => {
    render(<App />);
    const inputElement = screen.findAllByPlaceholderText(/    Search/i)
    expect(inputElement).toBeInTheDocument();
    
})