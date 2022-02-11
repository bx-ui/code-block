<template>
  <div class="industry-map custom-iview" ref="appRef">
    <div class="tab-header">
      <div class="header-wrapper">
        <div class="logo-title">- 产业经济大脑 -</div>
      </div>
    </div>
    <div class="content">
      <div class="content_left">
        <Menu
          title="招商工程"
          engTitle="Investment project"
          :style="{ marginLeft: '150px' }"
          :outLink="true"
          link="http://120.92.16.17/attract-web/#/chartList/index"
          img="data:image/png;base64,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"
        />
        <Menu
          title="工业产值倍增工程"
          engTitle="Industrial output value multiplication project"
          :style="{ marginLeft: '90px' }"
          :outLink="false"
          link="gongyeIndex"
          img="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAA9CAYAAAAal7HUAAAAAXNSR0IArs4c6QAAA+pJREFUaEPtml1oFFcUx8+5s+sau6v4sTHGCq2KHxWM+pBAKbgv8QPxTYVSDfl4qFb0qaJvjqDxQQy00qQPLX5U0DZRQwnEKG0mflDrBzVBMNlqQlzMJq4mMRlXd2fmHtk0K0t0mZ24bbM7d9+WOWf3/s7/zrnn3nMRbPxBG7ODgLer+kJ5obwNIyCmvQ1FH0EWyv/byhPRWgDYYeF/ahCxyYL9uEz/E+WJaDsA1FgY4Q5E/N6C/bhMJyT8ywjf9cm6Uz84cmbThy9vGooi6+OiM3GakPBX23qPbNjTWK8DGEgUCF8uDwIgpTsAExK+rqXzeGml8hty0JCxtuFPu/0gy9wW8LVK54myyubfEUEDTq3qZ487BHyapZ+Q014oL6a9eOftnfCeNpQtcLmkhRby3UlEHDCzz4iE97ypXGaMbTGDSXi+FBHbzeyzEl5Vo8s8Rw+3gxzDT14cZSV81c+tG/cfv9uFelSbbGg9IWWn+q5ZkJXwpZXK13VKVw8hqoDR2+GmL3sB4K29QVbClxxq3nu+pTPIAFUD4M/w5YrguOGJ6CMAqDdLIAnPLyLivvh3q/v5sRWe1YSXbvglAHDfAvxZRPzclvC6TnX5xTVlbJKHPNKg3tGws5wxVp1q8DJa+Ud9avOykrMHgQNHBwv21ZcW57jYMVvA+wMDN1ZVnPsOCLnE2MNA/daiqTnOb2wC//zGqoq6akDkEmcPA79+USjgU5Q+o995f0AoL6a9eOdFwhNLXUr5XmT7hNPbjNrYiKVOVHiivBW1vdjYpLTQAYilTix1/zQqxTpvoV31v57eZluRkwsA+zjnOPgi+kF3r5qnadyZLH+1Pxro/qrq2vX4MVbHmU05ebPcGzkABkMvpgf7w15uEEvmf+FK161j5+/9Hb+TM3ixrFCSpAJd51J3n5rbPxSZRkRJGy57qv9ouON/OpSWpkXCIHFK8Y9zJIAiDuQ2Td6jZ3i5zuG/HjTujoAsM/e1uYuBYQERJA1e/HfHXkhauP5b1xPNs9JgfAFQ8uDF/dMPv/anPDC0QqQU4BlyjtA5V1LvjsCDzDxr5iwi7lieKjwyvW34UtAf67bG4B8b7hWMYD5wc/iRXp3kvBlu2paeXt2M9aenRrk+jwN3mSpvcHKB81mB3tUzeosS3WtOeYle5RNzJJ32b5TnOkec3KNeKgnFem0+n+xodXycHwFtJkjMtM/IgEUmMUegv3HrUJq6tIQ+3wEJfKtN2UEB8HpDVFu7xXhjLMvMp6xm4DN3j/krvhaeeAdv8+ZfpFDIi6n5t4Ci7DeS3d40jV4KQ8xYEwGfsdK958CF8u8ZwIx1fw3C76qJmrvlawAAAABJRU5ErkJggg=="
        />
        <Menu
          title="中小企业培育"
          engTitle="Cultivation of small and medium-sized enterprises"
          :style="{ marginLeft: '20px' }"
          :outLink="false"
          link=""
          img="data:image/png;base64,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"
        />
        <Menu
          title="降低成本工程"
          engTitle="Cost reduction project"
          :style="{ marginLeft: '90px' }"
          :outLink="false"
          link=""
          img="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAA9CAYAAAAal7HUAAAAAXNSR0IArs4c6QAABLhJREFUaEPtmm1MW2UUx8+5t1BwQiVumrEPOvfiF+OWLbrE+WEz4cM0MUYTjLoQK4ahiZKZqFHJVhOnCQkZi/tgpotv04jVRVkIe8GtaJa4SQeFgFNeVwrIW2lLS8ttn3vMlZdVM3ef2xbopbdf77nPc37P/5zzPM/pRcjgH2YwOxjwmaq+obyhfAaugBH2vKIT0ToAeD3OvhsRj/K+n252mpQnoq0A0BIH4UDE3ekGxetPUvBE0PRA+bGivMLNtKZjjOz2YsY7cTrYJQUfCEWb1z75eTnEZMoSsnwb74kOOI/ti6YDGI8PScHLMkUjEgsoEwkiMrNJlBCBeCZeBJsuANiDiBLv2EnB806yBHYK8E5EbNYy14qA9wYjtk3FHx+eB88xrY/tzAnPqNUg3cMPe6dd95XUvjkj0Wy6EcoAOLImBl39DmvkZpGga/iIxKYee6Ph7UudY75ZSAaE6DfLzDX5cJkHbMpC/P9Pz/BUU9t+uPL45dZ5PASIELGrdxcU/NFhL1YtfLqFb746dm7Xq3VfLuhKwASEa+ZcbBuvK53iKXy6hPf6IwNbS7+3eQORuTMFEcg4DkAtocYXRwGRa7vVHTxjslRW9fPB2gs9g7PqCiQDhbIEat82s6Hf4dgd41FdsdEdvN3R+5n1/QvnF/IcBUkE1p1nmer02F8L84LrDr5n0O/cYv3uyAKgLMuIOCiaoy5//ctKxecK97gCyb9WN7jV8b+cpOV0JObdVfFjZWefLzg7FBHJoo+yWWt4x+AQ2Gw33dZuNL1uwv5kU98XJYfON8aFexgYdN67IdqV6GVKN/DTEeYt2n+q0tUzEQSgmEjQlyuY20fOloQSDSrdwCuA/cPB1i0v2KsZo1E0YUuwwToOwLet6Trs550/fcl94qkDZ2vWWyztPKe4FXW8lYliVV+7Kg591WLPOOUVJUPh2MgT79TvdXmkX8fsxXPVX3vm6yrn4/H6hqcu3v/8t+V3WfL/TDT8dQuvLMTpy+4Pn3nrXLXv9nwPJNA81TU8k0l691PnSzUnrtRNOcomtFZ+XcMr6vtDkqdof/1e97Vgs9Y9X/fwygJ0Dfgbt1lPVmg97a0IeGUBfvilt6r0vaaj3oesg2rtq5RcbMIS83V7/G3aN5nUvxGRWPjpA43VE4FpZ+BM6SRP/iel/NB46PfNz37zQepREhsREaICE3tuvUXqGDq1b1ptlBTCEwEKBMv5bx0KJGM0bJKhYzvb1KvW1UkRvEAky0FRlEcxJnC3kdSUSeR5DEUyCeC7w3Snu7vh0ZlFO9tfD3siJPBkgdxSWFCgqZWUCKDaOzm9k+R0lsXU8j5FyhMhojvfzJp5ck3N+aV6bsDzrvR/e3j/CntDeSPsVfdX3khbbDsj53lX2Mj5uE/RjIL3z9ne2OeNQ45xwuOtoMtsp3WrWw0Azyk+u0eDlp9+8+S9cuRiW0bk/HWhCHP3fLJOjMKDhLgq8+Af+agQxeztCLgKEWQk2WO5Lf+Kx1687Fda3mzSFPbxg65+/HjeTIitJVN2lvLhMctmgR3hjX+pdU94HVsKu4ThZ52zCWCbc9N2kNSaB0sBpGWOJOG1TJV+tgZ8+mmyNB79DTPVRGtJB9IUAAAAAElFTkSuQmCC"
        />
        <Menu
          title="企业家培养工程"
          engTitle="Entrepreneur training project"
          :style="{ marginLeft: '150px' }"
          :outLink="false"
          link=""
          img="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAA9CAYAAAAal7HUAAAAAXNSR0IArs4c6QAABZFJREFUaEPtmntMU1ccx3/n3r4rxSKgPJqhU3xMp3FOfEzt4gOdTkSXmBjUKJvTqcvGlImyiA50OhhExYHGOOaMYw5imJnvgOIQO8S5TWFsok4epjrpaAttb+85S03KEHG3UNbW9vbP/s659/v5fW9/55z+LgIf/iAfZgce3lfd553nnffBDPCPvQ+a/giZd57LeUJIGABkc43zoPhqhFA9lx6HnCeEDAGAKq6LeVB8KEKomkuPV8LXaY0jJy08WiOQ6klc1FomJQXhzhLhlfBJuZpF2YXX77AITCIzqtWVLNP5DPzSbcWJBedvNRAgRkDiyy2nFt8DANIxAV7p/JK04g8Lz9c2UoAMLMDlljPxjTx8B+t557mWhGdtqfPmx54YW606AY1osYhWdGacV8IzVty6/fC1rJ2HKx9tuDLXThgXP2fI2xRCdPskeCX8GU3dt7HJp4rag17YE7NkdGTgNK+H31dUlZ2wp+zyI1BMCEJUa8G26KkzXg5b5fXw12ubSqNWFu4HIIRgWkeDtUZ7Yvl+iZCe7PXwto1KRbX27DfFtReGRSgb4mZEzhLQ6I2ORc8rf/NcS7I97jXw93WmW5gQtq9SOtCn4Jv05vrX1p1Iq79vMJ3MnB0/7DnlREcS8Mw7r29htPM3nU69dP1e23G0PHd+/PD+yilcCfAo+Jq7f5fLpAJFeKB8GJdwW7zFxD6M23om7XRF/X37+OWzh6gyVo/fJBRQMq5reAx8bUNz5bgVx3ZhloXC7TNjJ43sNxch9NQDldnC6lekl6YVlNxssEPGTunf90CiOlkkpPy5wG1xj4Cve2C8MWHlsYyHzSbGLjpl+ZgX3l0wYpVISD2xL2esuCVhz6VPDn5ffds+furo8IAjKdOSZRI60BFwj4DX6kw3p6wp2nFXqzfZRSNMLECjxgWTBwSlrxn/caC/ZKg9xmJi3nyg4tOsoz/X2L8bMzjY77sd0cl+MlGIo+Buh2/Sm+ui1x3fduOWztAGjoBBrPUOzYqrkMBCApS9BhZsj9448vk+sSwmbMaRa5lb8678Yh8/WKWUns2anaT0E0d0Bdyt8J1V6VXzhkckLR618Gq1dtm0saoKAEQi1AclTZQlLGfjq4t0BqtyXXbZVTtkSB+5qGzvvPVBSsngroK7Db7FZG1aklqcelLzZ1uVjpsxKHT3e6/YqrQfAOgB4C2EUL5NpFpdLPhRdjuQMsMgAtZQQtHC3nKBoDx3/vvhwfIXuwPuFngzwxre+aw0Lf/czbZOyZyJEUFfbFQnS4S0sj0Ii/HnmoaGDyaoVK2QkkIpL4b4mYEeIBWL+mtyYxIHhCmiugvucnjGik2JOeWf7C+qqrWLVo8K7Z2/ZfpHcqkgqDMQjEnlXwbLwmB/yR+2+Euv58pOHVqa18df/MRBpauJcNlSx7KYSfvyavrOIz+1tbNGRwb1Or5jZrJCLgr9L+GEgM5osrzpJxMXEkLSASChq6CdjXcJvO3Asbvg112b9mnaitUglUJ6LnNuUoDC4SpNWJaU0jR67EzuTBJcAs9YsTE1rzIrI//abzaxtir9Q3ZMYnCANNIZ8c7OdQm8TSTGxPr1ud/zNuRUXCzLiUkID5KPcFa8s/NdBm8X2my0NCrkXduJOQv5tPkuh/+/QLpzXR6eb1TyXVq+Rc335ztUT74/z7Wc+Hp/PhgANmCMkc5okd+5Z+jHMFjIlTR3xdfvvXT8Ss2D5h55J6cdBJJNPxBCA0RhIL3cBefofXsePvpQP2CZsYh4PjxByAC0UOPUq2jtMx0w6yuFBVtVGLDYUQfcNY4CyiyiBHcfnohr7kyDQ9X+8YkEqdVbaFBzdo3cxfzvfUvOQ0nJZtb2h2kPwbufqacUdMP5nrq1+6/Dw7vfA/co8Gnn/wEFc0R6RQB9wgAAAABJRU5ErkJggg=="
        />
      </div>
      <div class="content_center">
        <div class="top">
          <div class="yuan">
            <img class="runss" src="../../assets/center.png" />
            <img class="runs" src="../../assets/center1.png" />
            <img class="run" src="../../assets/center2.png" />
          </div>
        </div>
        <div clas="bottom"></div>
      </div>
      <div class="content_right">
        <Menu
          title="满员工程"
          engTitle="Full capacity project"
          :style="{ marginLeft: '10px' }"
          :outLink="true"
          link="http://indeconomy.wanvdata.com.cn/rcfx/%E4%BA%BA%E6%89%8D%E5%88%86%E6%9E%90.html"
          img="data:image/png;base64,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"
        />
        <Menu
          title="困难企业盘活工程"
          engTitle="Project of revitalizing difficult enterprises"
          :style="{ marginLeft: '55px' }"
          :outLink="true"
          link=""
          img="data:image/png;base64,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"
        />
        <Menu
          title="创新工程"
          engTitle="Innovation Engineering"
          :style="{ marginLeft: '130px' }"
          :outLink="true"
          link="http://indeconomy.wanvdata.com.cn/#/novelty/cxqjt"
          img="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAA8CAYAAADRy2JxAAAAAXNSR0IArs4c6QAAA65JREFUaEPtmllME0EYx//f7mKbekVRA28aYxSMKMHzwTcM+u4REw88Eh5MjAeoJCrVRMX4IBHxSuDFxERLUIIRFSN4RCxWxYMCKhWPUAQVbUqBtrtjFqyCAdtC0R6zr+3Mfr/5fzPfsUOI4IcimB0cPlLV58pz5SNwBbjbR6Do3cgBV54xNhfAlmFY0DwiMgVy3uGAXw7AEEgjf861gogKAzlvyMDbO5yrF64vLgLMiEe8bDCslIe6EMMO7+h0W92K4vDXUEkQdDqtFOsZd934PnNVVtltt0twCxp8sJdu/AyA+Ttv7/8PO3zOpedH9uabavw18sDGpISdq2bv8ow7U2I+kX7yYRWBugRSqm03PloAveLvvP8U/vjFF9n78qvMPS8VGOCbt+o3zE1IXz0nw2Ps6WJzbkZe5SNiKrzw1Fb2riF04BlkxhSbIJJPWyB32+J5qcumZ/9Svth8Ij2v0hSS8MSULoBeaDuEjxTV6XWvPitMTY6N1l32wJ8rqc3ZkfvgSWjCA50iMdP3m5sbAfIKzxhbCqCUwwP4b8ozxkYBSPbxZF0E4NcpffeZtaj6zZcPGklwJk6b0JA0PbpFFEWvygNIBLDf886HNZ9KqupaLVGS4Jo9dbxlQVxMsygOGOpuEZHdm70+hTrG2AwAtd4mC6Lf44iozps9YQnvdCJeozlQD2Sxv50vYQl/6srLlMwzRovTBdf4kXJrU0lav+E1LOE3HanYfun26yaFyE5R0pP2axs+9ZcKhyX8ukPlu4vuWKwCyC4DRkfZJiuH/+ME5Mp7CwmhFuq42/M9H4ADr9e2IN2S/FgRWKCgO+UN6icgpz2H71kBGrWsYAJzKwmMoAtq2VVjGRwkCc8H6vf5GuomAchUYWUZos3RpVWT5mCFv3rv7bGtp8pbRWWMPKWlvePx4zRXf7b6BBBqoQ5A5FZ1bW32WUv2XKgf/crKKiqy5IEqu7BU/mCBafnRi9WNAqhrhKh9/7V0jS1i3D71UEVGYbnFytRujhhV5bixtpkXNryw+b0CYbnneWHDC5sAFDahluRwt+duz92ed295hsczPP8zPPVW1GF1mK3dqbN+cUx0y0wK1mbG1pz7BmNtyzfewxvq56o+DcyU8zGAaz71XFgI6qe7pMUQS9rehOOSz451itJkEUwT1ORqv1FtZsjuxrZbad8H3czoM1CvF2bWQALig50d6lXVmplwQ9//ZUWfStoQoByUiRx+UMsWBoO48mEg4qAQfgD0c/9bSl+5HwAAAABJRU5ErkJggg=="
        />
        <Menu
          title="去库存工程"
          engTitle="Destocking Engineering"
          :style="{ marginLeft: '55px' }"
          :outLink="true"
          link=""
          img="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAA8CAYAAADRy2JxAAAAAXNSR0IArs4c6QAAAz1JREFUaEPtWk1IFGEYft7ZH93VSs0wTYI6RCJ0SMS8dCgjCLzWqR8J8tS1oEPqQSGoQ4cQi6hDXQLrIAhRYHaxEj2IZl1U1Fa3/N32d3Zn3thKXN2d/Z22Wfeb67zf+73P88y87zN8Q8jji/IYOwT4fFVfKC+Uz0MGxGOfh6L/hpyU8sxcCaArh0i6RUQLiepNFvxRAJOJkhnofg0RfUlUz44E73R6jp2+3v8V+IyJWoTQ3q7GImJHgr/9aPjC/d6xGQUUsCqhmdW3ret5A/5y18CN3sFpBxO5Acsn7+uLiwB4OwE7UvlLnQM3Xw5OLUggtwJ89L65Gm5+Anyk+kL5RCOBmXNq1InHXrzzouGJbi9G3bbOLkadGHVxGBBzPoe+54XJESZHmBxhcoTJESZnkwHh8ITDEw4vNgPC3gp7m6g7GOO+8PY6evtiAE1hXcenVsqGJpxHfLJSaAydo6vofjU+Mffd49flxCYiPdnPPK40AQ0qOEyIoS/dwRede1LBwdBxiY0PXiVyk8U86ulvcabt7SPlrWrusa94TPusFlhSlb2marf15pX6eq11d54OD086XHKqebXi5SCCZUXKD0dfqzftI+rohUxAR1LWOHKt19t2wGbDrFaxPh8O2u0d3/QCD7QxQFGnsxv5UwaQSWHMXA1gLj54zP+5r110JjVErjUU+M7nY413n40uBmQpWKGqyzPvWvx6AdXxsd+aipnfA9iVRKHhPlGrFefyyrOqwopEpNoKzT6LWQppxP4kopNJ7Bc3RBflmXkVQEmmxaSwfo2ISlOIjxmak+CZeb3iVHe4f6AgEFDmz7oCWn9cxSNIL/APANhlWbE4lr175aBqTaQKM5PCbGKO/hGSCGwiUohiN72QqvobWnvvgSQ2seoqKtg/6ehrjjnO/jn4jQ1Km3r2yGxqhMTlicD/7ehxyGfNEbUlt0pLVlKGtH43yy54WE6AuRym5OBnFKWEJyItWRH88N/BVze+sK2VuA9JAbU4df+XBg1BQC2Q3CVrxdPzQ+d9qWbQ5Z3f3JSpru6h2X+4VOe82rAKp1Z5ZORaKB1TlLUiU1UlG/ECfDZYNuIeQnkjqpKNmn4BNlC7W89EYAsAAAAASUVORK5CYII="
        />
        <Menu
          title="绿色工程"
          engTitle="Green Engineering"
          :style="{ marginLeft: '10px' }"
          :outLink="true"
          link="http://service.gcloudinfo.net/"
          img="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAA9CAYAAAAal7HUAAAAAXNSR0IArs4c6QAAA95JREFUaEPtmltIFGEUgM+ZWUe23LKLUVkUFr30YkYGEWFBUARRPXSh6KIGiWSPRQRtRA9BCUVRRHaxiEo08MG2oloqupv2EF0oK9NEzURz3XRm/hOTSZvp7j/bzO6Q/zwt7PnPOd9/LnP+mUEYxBcOYnYQ8IM1+iLyIvKDcAdE2tsZdCJaDwAZUdh4hojFUazjXmJ75InoIgCs4vbot+AlRFwdxTruJY6FZwwuZ+adWOcZP41SXjRTSclKnZuKU9Cx8I1fO6+nrbmwEzRGCsgt6ayu3u/3apxcXGKOhX/zqe1hxqbSIyAhYwg1qXJH9durBV1cVJxCpuCJaAQALI2guxERfb0yRJQHALN1xqSG5uCots4uD3BM1a9qW99t2Hf7FiAymUnvPpatHJPsGWLYD3eVI2IrJzuHFyGaiCgdAKoiKL+LiPP6ykxdfDixSfXM0CU2BYgkXgd74Vt8Gw66ZJwTYd0MRKzm1W028pzwe7J6HNhNAEjGLwO+Xk9KlwjSAE3AU0/at1dsLIwEr6qQoSh7nofaDbcRlsMHgtrTcUuK14HkIl3SOjLVtCa/f76WleV1VSmpE7s1TElw6dx2VU0mxUXNrb7cYkSYGw7mdMXbZdsO3Hmlyqh6tGBTsz+/I6bwjEhTVRZAREIE5pIlDRF+Rp8I0Fyh/XLdyB+EZABQwsEUHLq/43TF6w8MWCcQVnbeyGkwzA60hjsCPc5z1TxvyVkul194b9dZ3+taJAroCfA4eDW3vrfs+jMm4HlDICIf+VbHu5eWy4m0FzUvGp7o9uJWN0Brtew+TwT6jSd1ZZa38D4KF86asAIR5P7sxK3bM0bqsEWncuyGb/dlF0kSJjgYnggImR0b0X4t+4zz4AnUWZvLthrALhm/j0xy17ndYOmTF0N36d5FNxH7P+DELe3tiLJZnQJeTHhiwhMTnpjw7J7wzHZmO+RFtxfdXnT72HV7xkg/duXFUTtqOVRn3vLp+ZKE4lTXd6Pj1vD+ONIyIgRQAWnAtyXRZkjbtdzzDjzVkbb92KN9BlSiIn+fPDbpc5JbsfxUt2rBlHOI4KzzfLSRtHJd3NLeSohodQl4MeSIISd2Q060dWrlOlHzoubtqfnRALDWSNXapo7hL9+3TurSWNjvZKxM60i69p+rfvC85ss3Wz5L+W2c0L34ZKqsQiYhDo3kVKz/tx9+wfHxKCszEZwHT0AB0rsrg7e2fLbsGV5oBEcvLfJ0BfRx5FL6nbNjHe1Qe6h1q4lD5YYv5Tnfwvlh6i3t34q8EnjjiTmA7Z8+eSO+K/xHeAeCm3BJwJvYrP9K9AcVpN1r2LCDyAAAAABJRU5ErkJggg=="
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, onMounted, onBeforeUnmount } from 'vue'
  import useDraw from '@/utils/useDraw'
  import { formatTime } from '@/utils/index'
  import { WEEK } from '@/constant/index'
  import { ArrowDown } from '@element-plus/icons'
  import Menu from '@/components/menu/Menu.vue'

  export default defineComponent({
    name: 'Home',
    components: { ArrowDown, Menu },
    setup() {
      // * 加载标识
      const loading = ref<boolean>(true)
      // * 时间内容
      const timeInfo = reactive({
        setInterval: 0,
        dateDay: '',
        dateYear: '',
        dateWeek: ''
      })
      // * 适配处理
      const { appRef, calcRate, windowDraw, unWindowDraw } = useDraw()
      // 生命周期
      onMounted(() => {
        handleTime()
        // todo 屏幕适应
        windowDraw()
        calcRate()
      })

      onBeforeUnmount(() => {
        unWindowDraw()
        clearInterval(timeInfo.setInterval)
      })

      // todo 处理时间监听
      const handleTime = () => {
        timeInfo.setInterval = window.setInterval(() => {
          const date = new Date()
          timeInfo.dateDay = formatTime(date, 'HH: mm: ss')
          timeInfo.dateYear = formatTime(date, 'yyyy-MM-dd')
          timeInfo.dateWeek = WEEK[date.getDay()]
        }, 1000)
      }

      // return
      return {
        loading,
        timeInfo,
        appRef
      }
    },
    data() {
      return {}
    },
    methods: {
      // 招商
      goToZhaoshang() {
        console.log('zhaoshang')
        window.location.href = 'http://120.92.16.17/attract-web/#/chartList/index'
      },
      // 工业产业
      goToGongye() {
        console.log('home')
        this.$router.push({ name: 'gongyeIndex' })
      },
      // 创新工程
      goToChuangxingongcheng() {
        window.location.href = 'http://indeconomy.wanvdata.com.cn/#/novelty/cxqjt'
      },
      // 满员工程
      goToManyuangongcheng() {
        window.location.href =
          'http://indeconomy.wanvdata.com.cn/rcfx/%E4%BA%BA%E6%89%8D%E5%88%86%E6%9E%90.html'
      },
      // 绿色工程
      goToLvsegongchen() {
        window.location.href = 'http://service.gcloudinfo.net/'
      }
    }
  })
</script>
<style lang="scss" scoped>
  .tab-header {
    flex-basis: 51px;
    flex-grow: 0;
    min-height: 151px;
  }
  .industry-map {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: rgba(23, 35, 61, 0.75);
    letter-spacing: 0.86px;
    line-height: 1;
    background: url('../../assets/bg.danao.png') no-repeat 50%;
    background-size: cover;
    position: relative;
    top: 0;
  }
  a {
    color: #fff;
  }
  .header-wrapper {
    width: 100%;
    background: url('../../assets/header.danao.png') no-repeat;
    background-size: 100%100%;
    height: 150px;
    z-index: 101;
    width: 100%;
    .logo-title {
      line-height: 140px;
      width: 440px;
      text-align: center;
      margin: auto;
      font-size: 34px;
      color: #fff;
      letter-spacing: 2px;
      // line-height: 40px;
      font-weight: 600;
      position: absolute;
      top: -8px;
      cursor: pointer;
      right: calc(50% - 220px);
    }
  }
  .content {
    height: 80%;
    display: flex;
    margin: 0 auto;
    margin-bottom: 40px;
  }
  .content_left {
    width: 500px;
    height: 100%;
  }
  .content_center {
    width: 850px;
    height: 750px;
    margin-left: -20px;
  }
  .content_right {
    float: right;
    width: 500px;
    height: 100%;
  }
  .top {
    width: 100%;
    height: 85%;
    transform: scale(1.2);
    margin-top: -60px;
  }
  .bottom {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 80px;
  }
  .yuan {
    width: 100%;
    height: 100%;
    position: relative;
    top: -30px;

    img {
      border: none;
      position: absolute;
      width: 100%;
    }
    .runss {
      z-index: 1;
    }
    .runs {
      -webkit-animation: rotates-runs 15s linear infinite;
      animation: rotates-runs 15s linear infinite;
      z-index: 3;
    }
    .run {
      -webkit-animation: rotate-run 20s linear infinite;
      animation: rotate-run 20s linear infinite;
      z-index: 2;
    }
  }
  @keyframes rotates-runs {
    0% {
      -webkit-transform: rotate(1turn);
    }
    25% {
      -webkit-transform: rotate(270deg);
    }
    to {
      -webkit-transform: rotate(0deg);
    }
  }
  @keyframes rotate-run {
    0% {
      -webkit-transform: rotate(0deg);
    }
    25% {
      -webkit-transform: rotate(90deg);
    }
    50% {
      -webkit-transform: rotate(180deg);
    }
    75% {
      -webkit-transform: rotate(270deg);
    }
    to {
      -webkit-transform: rotate(1turn);
    }
  }
  .list {
    position: relative;
    z-index: 999;
    width: 320px;
    height: 80px;
    cursor: pointer;
    display: flex;
    margin-top: 60px;
    background: url('../../assets/navigation.png') no-repeat 50%;
    background-repeat: no-repeat;
    background-size: 100% 100%;

    .icon {
      display: block;
      width: 40px;
      height: 40px;
      line-height: 80px;
      padding-top: 15px;
      margin-left: 20px;
      img {
        width: 100%;
      }
    }
    .title {
      cursor: pointer;
      padding-top: 20px;
      display: inline-block;
      width: 200px;
      height: 80px;
      color: #fff;
      margin-left: 10px;
      .tit {
        font-weight: 700;
        font-size: 20px;
      }
      .eng {
        margin-top: 5px;
        font-size: 12px;
      }
    }
    .menu {
      position: relative;
    }
  }
  .el-icon {
    display: inline-block;
  }
</style>
