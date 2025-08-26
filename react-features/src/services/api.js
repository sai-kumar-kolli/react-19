
export const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export const fetchParallelData = async (charecter) => {
    const filmResponse = charecter.films.map(fetchData);
    const response = await Promise.all(filmResponse);
    console.log(response);
    return response;
}


