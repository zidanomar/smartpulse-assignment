import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import {
  usePagination,
  useTable,
} from 'react-table/dist/react-table.development';

function DataTable({ data, columns }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  return (
    <Stack spacing='6'>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  {...column.getHeaderProps(column.getHeaderProps())}
                  isNumeric={column.isNumeric}
                >
                  <Text as='h5'>{column.render('Header')}</Text>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td
                    {...cell.getCellProps()}
                    isNumeric={cell.column.isNumeric}
                  >
                    {cell.render('Cell')}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Stack spacing='6' px='6'>
        <Flex justifyContent='space-between' position='relative'>
          <Button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            colorScheme='green'
          >
            Previous Page
          </Button>
          <Box
            position='absolute'
            top='50%'
            left='50%'
            transform='translate(-50%, -50%)'
          >
            Page{' '}
            <em>
              {pageIndex + 1} of {pageOptions.length}
            </em>
          </Box>
          <Button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            colorScheme='green'
          >
            Next Page
          </Button>
        </Flex>
        <Flex gap='6' justifyContent='space-between'>
          <Flex gap='4' alignItems='center'>
            <Text>Go to page:</Text>
            <Input
              w='100px'
              type='number'
              defaultValue={pageIndex + 1 || 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
            />
          </Flex>
          <Select
            w='300px'
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
        </Flex>
      </Stack>
    </Stack>
  );
}

export default DataTable;
