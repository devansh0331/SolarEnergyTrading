import { Card, Typography } from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import { Grid } from "react-loader-spinner";
import UseAutoScroll from "./UseAutoScroll";
import AutoScroll from "react-auto-scroll";

const TABLE_HEAD = [
  "Data/Time",
  "Device ID",
  "Voltage (V)",
  "Current (A)",
  "Power (W)",
  "Energy (kWh)",
  "Frequency (Hz)",
  "Power Factor (PF)",
];

export function EnergyRecords() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cnt, setCnt] = useState(0);
  const [home11, setHome11] = useState();
  const [home22, setHome22] = useState();
  const containerRef = useRef(null);

  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);
  let home111 = 0;
  let home222 = 0;
  // const URL =
  //   "https://script.google.com/macros/s/AKfycbyviZN9K4sXRkDdrPIXXERh2KHcLN51VH5CgZFL145UdAqWw1cqhW9_pM3_GLQqcBXRaA/exec";
  // const URL =
  //   "https://script.google.com/macros/s/AKfycbxr3gjKO-DS3KoyTGuMiHx0atUzfioSbWE44y21pOy2oIzFZ998IUYq76f3tLQCE7M7/exec";
  const URL =
    "https://script.google.com/macros/s/AKfycby1RvGRqATEuTqNbJsT_owH1PQx3jSJ0bNc7L0rkmB1J6bP6guO9p4VPJSB58ud6urE/exec?type=0";

  const fetchData = async () => {
    setLoading(true);

    await fetch(URL)
      .then((response) => response.json())
      .then((resData) => {
        setLoading(false);
        setData(resData);
        setIsScrolledToBottom(true);
      })
      .catch((error) => console.log("Error:", error));
  };

  useEffect(() => {
    fetchData();

    let intervalId = setInterval(fetchData, 5000); // Fetch every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full overflow-y-hidden-hidden h-screen  p-8">
      <div className="pt-3 pb-6">
        <p className="text-5xl ">Energy Transfer Records</p>
        <p className="text-xl  ">
          Below are the Real-time records of your Energy Consumption{" "}
        </p>
      </div>
      <Card className="h-full mx-auto shadow-md shadow-gray-300 overflow-scroll">
        <table className="w-full h-[400px] min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="w-full h-full pb-5 relative">
            {loading && cnt <= 1 && (
              <tr className="absolute left-1/2 top-36">
                <Grid
                  visible={true}
                  height="60"
                  width="60"
                  color="#0C6CF2"
                  ariaLabel="grid-loading"
                  radius="9.5"
                  wrapperClass="grid-wrapper"
                />
              </tr>
            )}
            {data.map(
              (
                {
                  timestamp,
                  energyMeterID,
                  voltage,
                  current,
                  power,
                  energy,
                  frequency,
                  pf,
                },
                index
              ) => {
                const isLast = index === data.length - 1;
                // useEffect(() => {
                //   if (energyMeterID == "Home1_11") {
                //     setHome11(power);
                //     console.log(home11);
                //   }
                //   if (energyMeterID == "Home1_22") {
                //     setHome22(power);
                //     console.log(home22);
                //   }
                // }, []);

                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  // (energyMeterID == "Home1_12" ||
                  //   energyMeterID == "Home1_11") && (
                  <>
                    {/* {(home111 = energyMeterID == "Home1_11" ? power : 0)}
                      {(home222 = energyMeterID == "Home1_12" ? power : 0)} */}
                    {/* {home111 != 0 && ( */}
                    <tr
                      key={timestamp}
                      onChange={() =>
                        setHome11(energyMeterID == "Home1_11" ? power : 0)
                      }
                    >
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {timestamp}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {energyMeterID}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {voltage}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {current}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {power}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {energy}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {frequency}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {pf}
                        </Typography>
                      </td>
                    </tr>
                    {/* )} */}
                  </>
                  // )
                );
              }
            )}
          </tbody>
          <AutoScroll bottom={isScrolledToBottom} />
        </table>
      </Card>
    </div>
  );
}
